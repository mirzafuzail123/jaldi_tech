import ActiveLeads from "./LeadList/ActiveLeads"
import LeadDetail from "./LeadDetail/LeadDetail"
import BackendInstance from "../utils/BackendInstance"
import LeadTasks from "./LeadDetail/LeadTasks"
import LeadActivity from "./LeadDetail/LeadActivity"
export default function LeadsRouter() {
    return (
        [
            {
                path: "/leads/active",
                element: <ActiveLeads />,


            },

            // LeadDetail
            {
                path: "/leads/leadDetail/:leadId",
                element: <LeadDetail />,

            },
            {
                path: "/leads/leadTasks/:leadId",
                element: <LeadTasks />,

            },
            {
                path: "/leads/leadActivity/:leadId",
                element: <LeadActivity />,

            },
        ]
    )

}
