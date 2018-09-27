class AppointmentsController < ApplicationController
  before_action :authenticate_user, only: [:create, :show, :update, :edit, :destroy]

  def index
    @appointment  = Appointment.new
    @appointments = current_user.try(:appointments).try(:order, 'appt_time ASC')

    respond_to do |format|
      format.html
      format.json { render json: @appointments ||= [] }
    end
  end

  def create
    @appointment = Appointment.new(appointment_params)
    @appointment.user = current_user

    if @appointment.save
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def show
    @appointment = current_user.appointments.find(params[:id])
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @appointment }
    end
  end

  def update
    @appointment = current_user.appointments.find(params[:id])
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def edit
    render :index
  end

  def destroy
    @appointment = current_user.appointments.find(params[:id])
    if @appointment.destroy
      head :no_content, status: :ok
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:appt_time, :title)
  end
end
