import React from 'react';
import * as moment from 'moment';
import { DATE_FORMAT } from '@constants';
import {Segment, Button, Grid, Icon, Label} from 'semantic-ui-react';

export const TimeLineRecord = ({ note, agency_id }) => (
  <li className='timeline-record'> 
    <div className={`timeline-record-text-preview back-${( note.agent.agent_agency_id == agency_id ? `right`: `left`)}`}>
      <div className="display-date-time">
        <div className='creation-date'>{moment.utc(note.created_at).local().format(DATE_FORMAT)}</div>
        <div className='creation-time'>{moment.utc(note.created_at).local().format('LT')}</div>
      </div>
      <div className='timeline-text'> 
      {
        note.is_status_event == 1 ? note.message : note.agent.name + ', ' + note.message
      }</div>
      {
        note.recordingUrl && (
          <audio controls>
            <source src={note.recordingUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )
      }
    </div> 
    {
      (note.is_status_event == 1) && 
      ( 
          ( note.agent.agent_agency_id  == agency_id )  && (
            <>
            <div className="arrow-down arrow-position-right"><span><i className="caret down icon"></i></span> </div>
            <div className="circle-send-receive circle-right circle-send-receive-label"> 
              {note.agent.name +', '+ note.status.description} 
              <div className={`circle-send-receive-label timeline-back-color-${note.status.name.charAt(0).toLowerCase()} ml-10 `}>
                  <span>{(note.status.name && note.status.name.charAt(0)) || note.status.name.charAt(0)}</span>
              </div> 
            </div>
            </>
          ) || (
            <>
            <div className="arrow-down arrow-position-left"><span><i className="caret down icon"></i></span></div>
            <div className="circle-send-receive circle-left circle-send-receive-label"> 
              <Button circular className='circle-send-receive-label timeline-back-color-default mr-10' icon='flaticon stroke user-1' as='a'/>
              {note.agent.name +', '+ note.status.description}
            </div>
            </>
          )
      ) || ( '' )
    }
    
    
    
    
  </li>
);
