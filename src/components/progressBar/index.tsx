import React, { useMemo } from 'react';

import { Container, Bar } from './nodes';

type ProgressBarProps = {
  currentValue: number,
  maxValue: number,
}

export const ProgressBar = ({ currentValue, maxValue }: ProgressBarProps) => {
    const completed = useMemo(() => (( currentValue * 100 )/ maxValue ), [currentValue, maxValue]);

    return (
      <Container>
        <Bar completed={completed}/>
      </Container>
    )
};
