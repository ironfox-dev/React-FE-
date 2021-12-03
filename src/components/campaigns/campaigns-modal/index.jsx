import React, { Component } from "react";
import {compose} from "recompose";

import {AgentsContainer, CompaniesContainer} from "../../../@containers";
import './index.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class CompaignsModal extends Component {

    state = {
        agentId: null,
    };
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.companyObject.id !== prevProps.companyObject.id) {
        //     this.props.getCompanyLeadStats(
        //         this.props.companyObject.id,
        //         this.state.startDate,
        //         this.state.endDate,
        //         this.state.agentId,
        //     );

        //     this.props.loadSelectBoxAgents({
        //         companyId: this.props.companyObject.id
        //     });
        // }
    }

    componentDidMount() {     
        // this.props.getCompanyLeadStats(
        //     this.props.companyObject.id,
        //     this.state.startDate,
        //     this.state.endDate,
        //     this.state.agentId,
        // );

        // this.props.loadSelectBoxAgents({
        //     companyId: this.props.companyObject.id
        // });
    }

    render() {
        const { onClose, lead_statics } = this.props;
        let percentage = 0;
        if(!isNaN(lead_statics.conversion_leads) && !isNaN(lead_statics.total_leads))
            percentage = Math.round(lead_statics.conversion_leads/lead_statics.total_leads*100);

        return (
            <div className="companyLeadStats campaigns">
                <div className="btnClose" onClick={() => onClose()}><i className="flaticon stroke x-2"></i></div>
                <div className="company-name-header">
                    <label>OVERALL</label>
                    <div className="company-name selectedname">
                        Conversion Rate
                    </div>
                    <div className="ring-chart">
                    <div className="ring-chart-text "> CONVERSION RATE </div>
                    
                    <CircularProgressbar 
                        value={percentage} 
                        strokeWidth={10}
                        text={`${percentage}`} 
                        styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0,
                            textSize: '16px',
                            pathColor: `#4a74ff, ${percentage / 100})`,
                            textColor: 'black',
                            
                          })}                        
                    />
                    <div className="ring-chart-percent"> % </div>
                </div>   
                </div>
                <div className="company-lead-stats-container selectedname">
                    <label>Lead Stats</label>
                 
                

                    <div className="totals top-margin">
                        <div className="total-leads">
                            <span className="value">
                                {lead_statics.total_leads || 0}
                            </span>
                            <label>TOTAL LEADS</label>
                        </div>
                        <div className="total-leads-converted">
                            <span className="value">
                                {lead_statics.conversion_leads || 0}
                            </span>
                            <label>CONVERSIONS</label>
                        </div>                        
                    </div>
                    <br />
                    <div className="totals">
                        <div className="leads-contacted">
                            <span className="value">
                                {lead_statics.contacted_leads || 0}
                            </span>
                            <label>CONTACTED</label>
                        </div>
                        <div className="leads-missed">
                            <span className="value">
                                {lead_statics.missed_leads || 0}
                            </span>
                            <label>MISSED LEADS</label>
                        </div>                        
                    </div>                    
                </div>
            </div>
        );
    }
}

export default compose(CompaniesContainer, AgentsContainer)(CompaignsModal);

