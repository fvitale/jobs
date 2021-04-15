Rails.application.routes.draw do
  root "searches#index"
  post "searches", to: "searches#create"
end
