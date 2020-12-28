import React from 'react';
import { IconContext } from 'react-icons';

import { PanelContainer } from './nodes';

type PanelProps = {
  onClick: () => void,
  icon: any,
  isHidden: boolean,
  isRemoved: boolean,
}

export const Panel = ({onClick, icon, isHidden, isRemoved}: PanelProps) => {

  const Icon = icon;

  return (
    <PanelContainer
      onClick={onClick}
      isHidden={isHidden}
      isRemoved={isRemoved}>
      <IconContext.Provider value={{ style: {width: '100%', height: '100%'}}}>
        <Icon/>
      </IconContext.Provider>
    </PanelContainer>
  )
};
