import React, { useState } from "react"

import { Link } from "react-router-dom"
import { Button, Divider, Icon, Menu, Portal } from "semantic-ui-react"


export default function CollapsedMenu({ ...props }) {


    const [visible, setVisible] = useState(false)

    const handleOpen = () => {
        setVisible(true)
    }

    const handleClose = () => {
        setVisible(false)
    }



    return (
        <Portal
            openOnTriggerClick
            onOpen={() => setVisible(true)}
            onClose={() => setVisible(false)}
            trigger={!visible ? <Button icon className="corner-menu"><Icon name="bars" /></Button> : null}
            open={visible}
        >
            <Menu vertical className="corner-menu no-margin">
                <Menu.Item>
                    <Menu.Menu>
                        <Menu.Item
                            as={Link}
                            to="/intro"
                            name="Introduction"
                        />
                        <Menu.Item
                            as={Link}
                            to="/guide"
                            name="Training Guide"
                        />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item className="collapsed-menu-item">
                    <Menu.Header as={MyButton}>Leave</Menu.Header>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header></Menu.Header>
                </Menu.Item>
            </Menu>
        </Portal>


    )
}

function MyButton() {
    return (
        <Button size="mini" negative>Leave</Button>
    )
}
