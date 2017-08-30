import { renderBasic, renderSlim } from './helpers.js';
import Experiment from '../models/Experiment';

export default function (FlowRouter) {
  FlowRouter.route('/', {
    action: () => renderBasic('home')
  });

  FlowRouter.route('/overview', {
    action: () => renderBasic('overview')
  });

  // TODO: Refactor into group
  FlowRouter.route('/experiment/:experimentId', {
    action: (params, queryParams) => {
      renderBasic('experimentLogin')
    }
  });

  FlowRouter.route('/experiment/:experimentId/queue', {
    action: (params) => {
      // Check if experiment exists
      if (Experiment.findOne({_id: params.experimentId})) {
        renderBasic('queue')
      }
      else {
        FlowRouter.go('/404');
      }
    }
  });

  FlowRouter.route('/experiment/:experimentId/dashboard', {
    action: () => renderBasic('dashboard')
  });

  FlowRouter.route('/requester', {
    action: () => renderBasic('requester')
  });

   FlowRouter.route('/failtobeready', {
    action: () => renderBasic('failtobeready')
  });

  FlowRouter.route('/requester/experiment/create', {
    action: () => renderBasic('createExperiment')
  });

  FlowRouter.notFound = {
    action: () => renderSlim('notFound')
  };
}
