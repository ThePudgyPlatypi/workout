Rails.application.routes.draw do

  
	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
	root 'application#angular'
	devise_for :users 

	resources :user_equipment, only: [:index, :create, :show, :destroy]

	resources :equipment, only: [:index, :show] do 
		resources :exercise, only: [:index]
	end

	resources :concentration, only: [:index, :show] do 
		resources :exercise, only: [:index]
	end

	resources :exercise, only: [:index] do
	end

	resources :equipment_cats, only: [:index, :show] do 
		resources :equipment, only: [:index]
	end
end
