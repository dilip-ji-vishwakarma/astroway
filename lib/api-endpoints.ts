//Sign in page
export const sign_in_endpoint = '/admin/auth/login'
export const refresh_token_endpoint = '/auth/refresh-token/'
export const manage_astrologer = "/admin/astrologers"
export const pending_astrologer = "/admin/astrologers?page=1&limit=5&isApproved=false"
export const approved_astrologer = "/admin/astrologer/toggle-approve"
export const blocked_astrologer = "/admin/astrologers?page=1&limit=5&isBlocked=true"
export const toggle_blocked_unblocked_astrologer = "/admin/astrologer/toggle-block"
export const admin_users = "/admin/users"
export const admin_chnage_password = "/admin/password"

