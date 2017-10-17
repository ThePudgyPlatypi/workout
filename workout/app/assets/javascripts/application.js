//= require angular
//= require angular-rails-templates
//= require angular-ui-router
//= require AngularDevise
//= require angularjs-rails-resource
//= require angular-animate
//= require jquery
//= require jquery_ujs
//= require angular.flashr
//= require toastr
//= require foundation
//= require underscore
//= require_tree .

$(function(){ $(document).foundation(); });

toastr.options = {
	"debug": false,
	"preventDuplicates": true,
	"progressBar": true, 
	"showMethod": 'slideDown',
	"positionClass": "toast-top-center",
	"closeButton": true,
	"onclick": null,
	"fadeIn": 300,
	"fadeOut": 1000,
	"timeOut": 2000,
	"extendedTimeOut": 1000
}