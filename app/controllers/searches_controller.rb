class SearchesController < ApplicationController
  include HTTParty

  # creates a Search record in db and returns github api results for the received params
  def create
    Search.create(search_params)

    render json: JSON.parse(get_job_positions.body)
  end

  private

  def get_job_positions
    # making use of github jobs proxy as CORS mechanism workaround
    HTTParty.get("https://github-jobs-proxy.appspot.com/positions?#{github_search_params}")
  end

  def search_params
    params.permit(:description, :location).merge( { ip_address: request.remote_ip } )
  end

  def github_search_params
    search_params.except(:ip_address).to_query
  end
end
