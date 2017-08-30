import config from '../universal/config';
import createMainRoutes from '../universal/routes/mainRoutes';
import createHome from './components/home/home';
import createExperimentLogin from './components/experimentLogin/experimentLogin';
import createHeader from './components/header/header';
import createQueue from './components/queue/queue';
import createDashboard from './components/dashboard/dashboard';
import createExperimentsDashboard from './components/overview/overview';
import createExperimentCreation from './components/createExperiment/createExperiment';
import createLogin from './components/login/login';
import createRequester from './components/requester/requester';

Template.registerHelper('equals', function (a, b) {
  return a === b;
});

document.title = 'LegionTeams';

createMainRoutes(FlowRouter);
createHome(Template);
createExperimentLogin(Template);
createQueue(Template);
createDashboard(Template);
createExperimentsDashboard(Template);
createExperimentCreation(Template);
createLogin(Template);
createRequester(Template);
createHeader(Template);
