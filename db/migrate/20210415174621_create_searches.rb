class CreateSearches < ActiveRecord::Migration[6.1]
  def change
    create_table :searches do |t|
      t.string :description
      t.string :location
      t.string :ip_address

      t.timestamps
    end
  end
end
