export interface AuthToken {
  token: string
}

export interface Application {
  id: number
  user: User
  job: {
    id: number
    title: string
    created_at: string
    rating_style: number
    rating_scale: number
    question_count: number
    assessment_type: null | string
    brand: null | string
  }
  invited_at: string
  responded_at: null | string
  rejected_at: null | string
  shortlisted_at: null | string
  onhold: boolean
  invitation_failed: boolean
  reviewed_by: null | string
  reviewed_at: null | string
  complete: number
  _token: string
  declined_at: null | string
  declined_reason: null | string
  answer_count: number
  average_review: {
    review_average: null | number
    from_count: number
  }
  user_rating: null | number
  deadline: string
  invite_url: string
}

export interface Job {
  url: string
  id: number
  company: Company
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  event: any // TODO: update with actual event type
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  competencies: any[]
  shortlisted: boolean
  is_editing: boolean
  applications: string
  questions: string
  reviews: string
  answerreviews: string
  reviewers: string
  activities: string
  attachments: {
    url: string
    job: string
    attachment: string
    filename: string
  }[]
  answers: string
  comments: string
  public_url: string
  job_template: number
  interview_limit_reached: boolean
  interview_soft_limit_reached: boolean
  applicant_accept_video_url: string
  applicant_accept_video_subtitles: string
  interview_intro_video_url: string
  interview_intro_video_subtitles: string
  interview_complete_video_url: string
  interview_complete_video_subtitles: string
  reviewer_accept_video_url: string
  function: null | string
  role: null | string
  reviewer_permissions: null | string
  marketplace_stock_image: null | string
  marketplace_image: null | string
  template_category: string[]
  first_response: string
  last_response: string
  title: string
  reference: null | string
  location: null | string
  contract_type: null | string
  contract_hour: null | string
  salary: null | string
  description: string
  applicant_deadline_days: number
  published_date: string
  created_at: string
  archived: boolean
  applicant_accept_subheading: string
  applicant_accept_text: string
  interview_intro_text: string
  assessment_type: null | string
  allow_answer_review: boolean
  record_answers: boolean
  advertise_review: boolean
  default_timezone: string
  default_locale: string
  reinvitation_deadline: number
  did_not_complete: string
  difficulty: string
  benchmark: number
  default_recorder: string
  rating_style: number
  rating_scale: number
  survey_id: string
  notify_of_completed_application: boolean
  invitation_from_name: string
  invitation_text: string
  invitation_promote_practice: boolean
  interview_complete_from_name: string
  interview_complete_message: string
  interview_complete_reply_to_email: null | string
  rejection_email_from_name: string
  rejection_email_reply_to_email: null | string
  rejection_email_body_text: string
  review_available_email_body_text: string
  interview_complete_notice: string
  marketplace_public: boolean
  marketplace_order: null | number
  marketplace_featured: boolean
  marketplace_title: string
  marketplace_description: string
  marketplace_details: string
  marketplace_use_sso: boolean
  sjt_assessment: boolean
  sjt_pass_mark: number
  fixed_deadline: null | string
  is_questionnaire: boolean
  is_webinar: boolean
  brand: null | string
}

export interface Company {
  url: string
  id: number
  shortname: string
  job_limit_exceeded: boolean
  company_data_role: string
  logo: string
  application_email: string
  name: string
  account_name: string
  ats_feedback_url: string
  target_connect_enabled: boolean
  target_connect_client: string
  logo_height: number
  logo_width: number
  account_type: string
  data_retention_days: number
  default_did_not_complete: string
  sms_enabled: boolean
  sms_shortname: string
  i18n_enabled: boolean
  support_email: string
  privacy_email: string
  contact_email: string
  reply_to_email: string
  default_locale: string
  default_timezone: string
  default_reinvitation_deadline: number
  default_advertise_review: boolean
  default_thinking_time: number
  default_benchmark: number
  default_recorder: string
  default_rating_style: number
  default_rating_scale: number
  default_survey_id: string
  notify_of_completed_application: boolean
  account_message: string
  account_message_style: number
  custom_field_label: string
  marketplace_title: string
  marketplace_logo: string
  marketplace_header_image: string
  marketplace_heading: string
  marketplace_subheading: string
  marketplace_primary: string
  marketplace_dark: string
  marketplace_light: string
  transcribe_answers: boolean
  freemium: boolean
  hs_company_type: string
  data_role: string
  marketplace_enabled: boolean
  marketplace_theme: string
  marketplace_video_subtitles: null | string
  marketplace_cta_name: null | string
  marketplace_cta_link: null | string
  hub_enabled: boolean
  marketplace_video: null | string
  theme: {
    primaryColor?: string
    buttonColor?: string
    buttonHoverColor?: string
    snap?: string
    crackle?: string
  }
}

export interface User {
  email: string
  first_name: string
  last_name: string
  full_name: string
  phone: string
  locale: string
}
