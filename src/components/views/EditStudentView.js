import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
    formContainer:{  
        width: '500px',
        backgroundColor: '#f0f0f5',
        borderRadius: '5px',
        margin: 'auto',
    },
    title: {
        flexGrow: 1,
        textAlign: 'left',
        textDecoration: 'none'
    }, 
    customizeAppBar:{
        backgroundColor: '#11153e',
        shadows: ['none'],
    },
    formTitle:{
        backgroundColor:'#c5c8d6',
        marginBottom: '15px',
        textAlign: 'center',
        borderRadius: '5px 5px 0px 0px',
        padding: '3px'
    },
 }));

const EditStudentView = (props) => {
    const {handleChange, handleSubmit, student } = props;
    const classes = useStyles();
    //input form in new campus view 
    return (
        <div>
          <h1 style={{margin:'20px', color:'white'}}>Edit Student</h1>
    
          <div className={classes.root}>
            <div className={classes.formContainer}>
              <div className={classes.formTitle}>
                <Typography style={{fontWeight: 'bold', padding:'10px',fontSize: '20px'}}>
                {student.firstname}
                </Typography>
              </div>
              <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
                <label style= {{ fontWeight: 'bold'}}>First Name: </label>
                <input type="text" name="firstname" required defaultValue={student.firstname} onChange ={(e) => handleChange(e)} />
                <br/>
                <br/>
                <label style= {{ fontWeight: 'bold'}}>Last Name: </label>
                <input type="text" name="lastname" required defaultValue={student.lastname} onChange ={(e) => handleChange(e)} />
                <br/>
                <br/>
                <label style= {{ fontWeight: 'bold'}}>Email: </label>
                <input type="text" name="email" required defaultValue={student.email} onChange ={(e) => handleChange(e)} />
                <br/>
                <br/>
    
                <label style= {{ fontWeight: 'bold'}}>Image URL: </label>
                <input type="text" name="imageUrl" placeholder='(optional)' defaultValue={student.imageUrl} onChange ={(e) => handleChange(e)} />
                <br/>
                <br/>
    
                <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
                <input type="number" name="gpa" required min="0.0" max="4.0" step="0.1" onChange={(e) => handleChange(e)} />
                <br/>
                <br/>
                <label style= {{ fontWeight: 'bold'}}>Campus id: </label>
                <input type="text" name="campusId" required defaultValue={student.campusId} onChange ={(e) => handleChange(e)} />
                <br/>
                <br/>
                <Button style={{backgroundColor:'#585858',borderRadius:10,color:'white'}} type="submit">
                  Submit
                </Button>
                <br/>
                <br/>
              </form>
              </div>
          </div>
        </div>    
      )
    }
    
    export default EditStudentView;

