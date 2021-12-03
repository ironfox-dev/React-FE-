import { createSelector } from 'reselect';

export const agentProfile = createSelector(
  state => state.agents.agentProfile,
  agentProfile => {
    console.log(agentProfile)
    return (
      agentProfile
    )
  },
);

export const selectBoxAgents = createSelector(
  state => state.agents.selectBoxAgents,
  selectBoxAgents => selectBoxAgents.map(agent => ({
    key: +agent.id,
    value: +agent.id,
    text: agent.name,
    image: { avatar: true, src: agent.avatar_path },
  })),
); 

export const selectBoxCompanies = createSelector(
  state => state.companies.selectBoxCompanies,
  selectBoxCompanies => selectBoxCompanies.map(company => ({
    key: company.id,
    value: company.id,
    text: company.name,
  })),
);


export const agentCompaniesIds = createSelector(
  state => state.agents.agent,
  agent => {
    return (agent.companies && agent.companies.map(company => Number(company.id))) || []
  },
);
