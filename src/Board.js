import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    // All tasks start in Backlog
    const clients = this.getClients().map(client => ({
      ...client,
      status: 'backlog'
    }));

    this.state = {
      clients: {
        backlog: clients,
        inProgress: [],
        complete: []
      }
    };

    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef()
    };
  }

  componentDidMount() {
    this.dragula = Dragula([
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current
    ]);

    this.dragula.on('drop', (element, target) => {
      if (!target) return;

      // Change the card's color when moved
      element.classList.remove(
        'Card-grey',
        'Card-blue',
        'Card-green'
      );

      if (target === this.swimlanes.backlog.current) {
        element.classList.add('Card-grey');
        element.dataset.status = 'backlog';
      } else if (target === this.swimlanes.inProgress.current) {
        element.classList.add('Card-blue');
        element.dataset.status = 'in-progress';
      } else if (target === this.swimlanes.complete.current) {
        element.classList.add('Card-green');
        element.dataset.status = 'complete';
      }
    });
  }

  componentWillUnmount() {
    if (this.dragula) {
      this.dragula.destroy();
    }
  }

  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix'],
      ['6','Boehm and Sons','Automated Systematic Paradigm'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude'],
      ['10','Romaguera Inc','Managed Foreground Toolset'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access']
    ].map(company => ({
      id: company[0],
      name: company[1],
      description: company[2],
      status: 'backlog'
    }));
  }

  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane
        name={name}
        clients={clients}
        dragulaRef={ref}
      />
    );
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-4">
              {this.renderSwimlane(
                'Backlog',
                this.state.clients.backlog,
                this.swimlanes.backlog
              )}
            </div>

            <div className="col-md-4">
              {this.renderSwimlane(
                'In Progress',
                this.state.clients.inProgress,
                this.swimlanes.inProgress
              )}
            </div>

            <div className="col-md-4">
              {this.renderSwimlane(
                'Complete',
                this.state.clients.complete,
                this.swimlanes.complete
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }
}