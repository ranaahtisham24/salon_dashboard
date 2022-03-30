import { updateEmail, updateProfilePic, updateUsername } from "../../actions/auth/auth"



export const changeProfilePic = (dispatch, data, toast) => {
    dispatch(updateProfilePic(data, toast))
}

export const changeUserName = (dispatch, data, toast) => {
    dispatch(updateUsername(data, toast))
}

export const changeEmailAddress = (dispatch, data, toast) => {
    dispatch(updateEmail(data, toast))
}

export const changePassword = (dispatch, data, toast) => {

}