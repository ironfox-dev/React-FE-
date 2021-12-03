import React, {useEffect, useState} from 'react';
import * as moment from "moment";
import {
  Checkbox
} from 'semantic-ui-react';
import { AvatarImage } from 'components/@common/image';
import { Link } from 'react-router-dom';
import { DATE_FORMAT } from "@constants";

export const CardContent = ({ onSelectedDeal,  dealIds = [], deal, link, company }) => {
  const [checked, setChecked] = useState({});

  useEffect(function () {
    if (dealIds && dealIds.length) {
      setChecked({ checked: dealIds.includes(deal.id) });
    }
  }, [dealIds]);

  return (
    <React.Fragment>
      <div className="dealContainer">
        <div>
          <Checkbox value={deal.id} {...checked} onChange={(event, value) => onSelectedDeal(value)} />
        </div>
        <Link to={{
          pathname: link,
          state: { deal }
        }}>
          <div className="companyContainer">
            <AvatarImage src={company.avatar_path} avatar rounded size='medium' />
            <div className="dealName">{deal.name}</div>
          </div>
          <p>{company.name}</p>
        </Link>
      </div>
      <div><label className="started">Started</label> {moment(deal.created_at).format(DATE_FORMAT)}</div>
      <div><label className="totalLeads">Total leads</label> {deal.leadsCount}</div>
      <div><label className="conversations">Conversions</label> {deal.leads_conversion}</div>
    </React.Fragment>
  );
}
