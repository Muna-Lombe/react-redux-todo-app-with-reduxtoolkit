import { FILTER__COLOR_FILTER_CHANGED, FILTER__STATUS_FILTER_CHANGED } from "../../actionTypes"

export const colorFilterChanged = ( color, changeType ) => {
    return {
      type: FILTER__COLOR_FILTER_CHANGED,
      payload: { color, changeType }
    }
  }
 
export const statusFilterChanged = ( status ) => {
    return {
        type: FILTER__STATUS_FILTER_CHANGED,
        payload: status
    }
}