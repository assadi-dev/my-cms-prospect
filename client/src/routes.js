/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Calendar from "views/Calendar";
import DemarcheTable from "views/DemarcheTable";

var routes = [
  {
    path: "/tableau-de-board",
    name: "Tableau de board",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/entreprises",
    name: "Mes entreprises",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-badge",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/rendez-vous",
    name: "Mes rendez-vous",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-calendar-60",
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/demarche",
    name: "Mes Démarches",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-sound-wave",
    component: DemarcheTable,
    layout: "/admin",
  },

  /* {
    path: "/profile",
    name: "Mon profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },*/
];
export default routes;
