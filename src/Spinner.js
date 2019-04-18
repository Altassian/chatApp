import React from 'react';
import { Loader, Dimmer, Segment } from 'semantic-ui-react'


const Spinner = () => (
    <Segment>
    <Dimmer active>
        <Loader size = "huge" content = {"Preparing chat..."} />
    </Dimmer>
    </Segment>
)

export default Spinner;