class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      token_object = Knock::AuthToken.new(payload: {sub: user.id})
      render json: {jwt: token_object.token}
    else
      render json: {status: :unprocessable_entity, error: "User could not be created."}
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
