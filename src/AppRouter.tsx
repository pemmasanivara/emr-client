import { SessionCalendar } from "pages/Session/SessionCalendar";
import { UserList } from "pages/User/UserList";
import {
    Switch,
    Route,
  } from "react-router-dom";
  
  export function AppRouter() {
      return (<Switch>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/Session">
            <SessionCalendar />
        </Route>
        <Route path="/">
            <UserList />
        </Route>
      </Switch>)
  }