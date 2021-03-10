import React from 'react'
import {
  Face,
  MarkunreadMailbox,
  Email,
  Phone,
  Payment
} from '@material-ui/icons'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Card
} from '@material-ui/core'

// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const MyAccount = ({user}) => {
  return (
    <div>
      <br />
      <br />
      <Card style={{margin: '0px 300px 0px 300px'}}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText
              primary={user.name ? user.name : 'no info provided'}
            />
            <ListItemSecondaryAction>
              <ListItem button edge="end">
                Edit
              </ListItem>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary={user.email} />
            <ListItemSecondaryAction>
              <ListItem button edge="end">
                Edit
              </ListItem>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText
              primary={user.phone ? user.phone : 'no phone number provided'}
            />
            <ListItemSecondaryAction>
              <ListItem button edge="end">
                Edit
              </ListItem>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <MarkunreadMailbox />
            </ListItemIcon>
            <ListItemText
              primary={user.delivery ? user.delivery : 'no address provided'}
            />
            <ListItemSecondaryAction>
              <ListItem button edge="end">
                Edit
              </ListItem>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Payment />
            </ListItemIcon>
            <ListItemText
              primary={user.billing ? user.user.billing : 'no address provided'}
            />
            <ListItemSecondaryAction>
              <ListItem button edge="end">
                Edit
              </ListItem>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Card>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(MyAccount)
