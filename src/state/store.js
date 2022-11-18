import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./user";
import adminReducer from "./admin";
import clientsReducer from "./clients";
import adminsReducer from "./admins";
import securityGuardsReducer from "./securityGuards";
import branchOfficesReducer from "./branchOffices";
import provincesReducer from "./provinces";
import resetPasswordReducer from "./resetPassword";
import oneBranchOfficeReducer from "./oneBranchOffice";
import coordsReducer from "./coords";
import guardEventsReducer from "./guardEvents";
import branchOfficeEventsReducer from "./branchOfficeEvents";
import isSelectedReducer from "./selected";
import filteredGuardsReducer from "./filteredGuards";
import oneSecurityGuardReducer from "./oneSecurityGuard";
import filteredBranchOfficeReducer from "./filteredBranchOffice";


const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    admin: adminReducer,
    admins: adminsReducer,
    clients: clientsReducer,
    securityGuards: securityGuardsReducer,
    branchOffices: branchOfficesReducer,
    provinces: provincesReducer,
    resetPassword: resetPasswordReducer,
    oneBranchOffice: oneBranchOfficeReducer,
    coords: coordsReducer,
    guardEvents: guardEventsReducer,
    branchOfficeEvents: branchOfficeEventsReducer,
    isSelected: isSelectedReducer,
    filteredGuards: filteredGuardsReducer,
    oneSecurityGuard: oneSecurityGuardReducer ,
    filteredBranchOffice: filteredBranchOfficeReducer,
  },
});

export default store;
