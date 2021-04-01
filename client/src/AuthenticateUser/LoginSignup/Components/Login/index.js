import React, { useState } from "react"

import { Segment, Input, Button, Divider, Header, Message} from "semantic-ui-react"

export default function Login({ username, setUsername, password, setPassword, attemptLogin, invalidPassword, invalidUsername, loadingCredentials, ...props }) {



    return (

        <Segment textAlign="center" loading = {loadingCredentials}>
            <Header as="h2">Existing Users</Header>
            <Input
                onChange={event => setUsername(event.target.value)}
                placeholder="Username"
                value={username}
                icon="user"
                iconPosition="left"
            />
            <Input
                onChange={event => setPassword(event.target.value)}
                placeholder="Password"
                value={password}
                icon="lock"
                iconPosition="left"
                type = "password"

            />
            <Divider />


            <Button

                color="green"
                disabled={!username || !password}
                onClick={attemptLogin}
            >
                Login
                </Button>

            {invalidUsername &&
                <Message negative>
                    No account exists with this username
                                </Message>
            }
            {invalidPassword &&
                <Message negative>
                    Incorrect password for this username
                                </Message>
            }

        </Segment>
    )

}