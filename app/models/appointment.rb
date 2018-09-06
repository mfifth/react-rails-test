class Appointment < ApplicationRecord
  validates_presence_of :title, :appt_time
  validates :title, length: {minimum: 5}
  validate :appt_time_is_present?

  private

  def appt_time_is_present?
    if appt_time.present? && appt_time < Time.current
      errors.add(:appt_time, "Date cannot be in the past.")
    end
  end
end
