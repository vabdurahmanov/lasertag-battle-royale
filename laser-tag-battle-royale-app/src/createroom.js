import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
class CreateRoom extends React.Component {
  render(){
    return (
        <div>
            <h1>Create Lobby</h1>
            <TextField id="lobby-name" label="Lobby Name"></TextField>
            <form autoComplete="off">
                <FormControl>
                    <Select>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value = "1">1</MenuItem>
                        <MenuItem value = "2">2</MenuItem>
                        <MenuItem value = "3">3</MenuItem>
                        <MenuItem value = "4">4</MenuItem>
                        <MenuItem value = "5">5</MenuItem>
                        <MenuItem value = "6">6</MenuItem>
                    </Select>
                </FormControl>
            </form>
            <Button id="create-room-button" component={Link} to="/lobby/waiting">Create Lobby</Button>
        </div>
   );
  }
}

export default CreateRoom;
