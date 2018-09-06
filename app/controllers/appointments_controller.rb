class AppointmentsController < ApplicationController
  def index
    @appointment  = Appointment.new
    @appointments = Appointment.order('appt_time ASC')

    respond_to do |format|
      format.html
      format.json { render json: @appointments }
    end
  end

  def create
    @appointment = Appointment.new(appointment_params)

    if @appointment.save
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def show
    @appointment = Appointment.find(params[:id])
    render json: @appointment
  end

  private

  def appointment_params
    params.require(:appointment).permit(:appt_time, :title)
  end
end
