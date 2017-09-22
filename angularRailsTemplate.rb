# for tracking devise install
devise = false
appName = @app_name.camelize(:lower)

# Angular gems
gem 'angular-rails-templates'
gem 'angular_rails_csrf'

# misc gems
gem 'foundation-rails'
gem 'responders'

# testing
gem_group :development, :test do
  gem "rspec-rails"
  gem "capybara"
end

# DEVISE
# whether or not you will need users
if yes?("Would you like to install Devise?")
  gem "devise"
  devise = true
  generate "devise:install"
  model_name = ask("What would you like the user model to be called? [user]")
  model_name = "user" if model_name.blank?
  generate "devise", model_name
end

# BOWER STUFFS
# Get bower initialized
# need to have node, npm, and bower all ready to go for this to work.
# it will fail otherwise since you dont have the stuff to make the juice!
run "bower init"
# Making bowerrc file at route that will tell bower where we want our stuff installed
create_file '.bowerrc'
insert_into_file ".bowerrc", '{"directory":"vendor/assets/bower_components"}',
	:after => ""
# this installs the main dependencies
# this may need to be adjusted from time to time
# and don't forget to update the javascripts array below to add the scripts 
run "bower install angular angular-ui-router --save"
# This runs if devise is installed 
if devise 
	run "bower install angular-devise --save"
end


# Add my source folder to source path
def source_paths
  Array(super) +
    [File.join(File.expand_path(File.dirname(__FILE__)),'angularRails_root')]
end


# FILE MANIPULATIONS
# create angular stuffs
inside 'app' do
	inside 'assets' do 
		# this adds back our javascripts folder
		empty_directory 'javascripts'
		# this adds in all the folders for angular
		# It also adds in all the dependencies we need to load to make angular work
		# You can add more, just make sure the name is correct, and that rails asset pipeline can find it
		# Intalls devise if I selected yes above
		inside 'javascripts' do 
			empty_directory 'controllers'
			empty_directory 'services'
			empty_directory 'views'
			empty_directory 'directives'
			create_file 'application.js'
			insert_into_file "application.js", :after => "" do
				javascripts = [
					"angular",
					"angular-rails-templates",
					"angular-ui-router"
				]
				if devise
					javascripts.push("AngularDevise")
				end
				javascripts.map! {|script| "//= require " + script}
				javascripts.push("//= require_tree .")
				javascripts.join("\n")
			end
			# insert a template to create angular module with project name
			template 'app.js'
		end
	end

	inside 'controllers' do
		# I am not entire sure what this does, but it is inherited by all the controllers and it is needed to get routing working right
		# with angular
		insert_into_file 'application_controller.rb', "\n\trespond_to :json", 
			:after => "protect_from_forgery with: :exception"
		insert_into_file 'application_controller.rb', "\n\tdef angular\n\t\trender 'layouts/application'\n\tend", 
			:after => "respond_to :json"
	end

	inside 'views' do 
		inside 'layouts' do
			# since javascript was skipped we need to add in the javascript_include_tag
			insert_into_file 'application.html.erb', "\n\t<%= javascript_include_tag 'application' %>", 
				:after => "<%= stylesheet_link_tag    'application', media: 'all' %>"		
			# attempting to add in the ng-app with the proper name to bind the angular module right off the bat 
			gsub_file 'application.html.erb', "<body>", '<body ng-app="#{appName}">'	
			# removing yeild so that angular can take care of the templating
			gsub_file 'application.html.erb', "<%= yield %>", "<ui-view></ui-view>"	
		end
	end
end
# adding root that points to angular 
inside 'config' do
	insert_into_file 'routes.rb', "\n\troot 'application#angular'", 
		:after => "Rails.application.routes.draw do"
	insert_into_file 'database.yml', :after => "password:" do
		pass = ask "What is your database password?"
		password = " " + pass
		password
	end
end


# initialize git
git :init

# install foundation
rails_command "generate foundation:install"
if yes?("Would you like to create your database?")
	run "sudo service mysql start"
	rails_command "db:create"
end