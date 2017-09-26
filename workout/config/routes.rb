Rails.application.routes.draw do

	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
	root 'application#angular'
	devise_for :users

	resources :equipment, only: [:index, :show] do
	end

	resources :concentration, only: [:index, :show] do 
	end

	resources :exercise, only: [:index, :show] do
	end
end
