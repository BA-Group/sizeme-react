import { takeLatest, put, call, select } from "redux-saga/effects"
import {
    RECEIVE_PROFILE_LIST,
    REQUEST_PROFILE_LIST,
    SELECT_PROFILE,
    SELECT_PROFILE_DONE,
    SelectProfileAction
} from "./types"
import { RootState } from "../index"
import * as api from "../../api/backend-api"
import { Measurements, Profile } from "../../api/types"

const storeMeasurementsKey = "sizemeMeasurements"
const getLoggedIn = (state: RootState) => state.auth.loggedIn

export function* watchRequestProfileList() {
    yield takeLatest(REQUEST_PROFILE_LIST, getProfileList)
}

function* getProfileList() {
    const token = yield select((state) => state.auth.token)

    if (!token) {
        yield put({
            type: RECEIVE_PROFILE_LIST,
            payload: []
        })
        return
    }

    try {
        const profileList = yield call(api.getProfiles, token)
        yield put({
            type: RECEIVE_PROFILE_LIST,
            payload: profileList
        })
    } catch (reason) {
        yield put({
            type: RECEIVE_PROFILE_LIST,
            error: reason
        })
    }
}

export function* watchSelectProfile() {
    yield takeLatest(SELECT_PROFILE, selectProfile)
}

function* selectProfile({ payload: profileId }: SelectProfileAction) {
    const state: RootState = yield select()

    if (profileId && state.profile.selectedProfile.id === profileId) {
        yield put({
            type: SELECT_PROFILE_DONE,
            payload: state.profile.selectedProfile
        })
        return
    }

    const jsonMeasurements = localStorage.getItem(storeMeasurementsKey)
    let storedMeasurements: Measurements = {}
    if (jsonMeasurements) {
        try {
            storedMeasurements = JSON.parse(jsonMeasurements) as Measurements
        } catch (error) {
            // no action
        }
    }

    const loggedIn = yield select(getLoggedIn)
    if (!loggedIn) {
        yield put({
            type: SELECT_PROFILE_DONE,
            payload: {
                gender: "Female",
                profileName: "My profile",
                measurements: storedMeasurements
            }
        })
        return
    }

    const profileList: Profile[] = yield select((state: RootState) => state.profile.profileList)
    if (profileList.length === 0) {
        yield put({
            type: SELECT_PROFILE_DONE,
            payload: {
                gender: "Female",
                profileName: "My profile",
                measurements: storedMeasurements
            }
        })
        return
    }

    let profile: Profile | undefined
    const storedProfileId = sessionStorage.getItem("sizeme.selectedProfile")
    const effProfileId = profileId || storedProfileId
    if (effProfileId) {
        profile = profileList.find((p: Profile) => p.id === profileId)
    }

    if (!profile) {
        profile = profileList[0]
    }

    sessionStorage.setItem("sizeme.selectedProfile", profile.id)

    if (storedProfileId === profile.id && Object.keys(storedMeasurements).length) {
        yield put({
            type: SELECT_PROFILE_DONE,
            payload: {
                ...profile,
                measurements: {
                    ...profile.measurements,
                    ...storedMeasurements
                }
            }
        })
    } else {
        localStorage.removeItem(storeMeasurementsKey)
        yield put({
            type: SELECT_PROFILE_DONE,
            payload: profile
        })
    }
}