import { combineReducers } from 'redux'

import { entitiesF } from './search'
import { entities } from './fetch'
import { modal } from './modal'
import { view } from './view'
import { thisDoc } from './edit'

const appState = combineReducers({
  entities,
  entitiesF,
  modal,
  view,
  thisDoc
})

export default appState
