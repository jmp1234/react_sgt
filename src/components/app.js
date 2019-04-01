import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, {Component} from 'react';
import axios from 'axios';
import StudentTable from './students_table';
import AddStudent from './add_student';

// let id = 100;

class App extends Component {
  state = {
    students: [],
    error: ''
  }

  addStudent = async ( student ) => {
    await axios.post('/api/grades', student);

    this.getStudentData();

    // student.id = id++;
    //
    // this.setState({
    //   students: [...this.state.students, student]
    // })
  }

  deleteStudent = async (id) => {
    await axios.delete(`/api/grades/${id}`);

    console.log('delete response:', resp);
    this.getStudentData();
    // const studentsCopy = this.state.students.slice();
    //
    // const index = studentsCopy.findIndex(student => {
    //   return student.id === id;
    // })
    //
    // if(index >= 0) {
    //   studentsCopy.splice(index, 1);
    //   this.setState({
    //     students: [...studentsCopy]
    //   })
    // }
  }

  componentDidMount() {
    this.getStudentData();
  }


  async getStudentData() {
    //Call server here

    try {
      const resp = await axios.get('/api/grades');

      this.setState({
        students: resp.data.data,
      });

    } catch (err) {
        this.setState({
          error: 'Error retrieving student data'
        });
    }


    // axios.get('http://localhost:3001/api/grades').then((resp) => {
    //   console.log('response:', resp);
    //
    //   this.setState({
    //     students: resp.data.data,
    //   });
    // }).catch((err) => {
    //   console.log('error:', err.message);
    //
    //   this.setState({
    //     error: 'Error retrieving student data'
    //   });
    // });

  }

  render(){
    return(
      <div>
        <h1 className="center">React SGT</h1>

        <h5 className="red-text text-darken-2">{this.state.error}</h5>
        <div className="row">
          <StudentTable delete={this.deleteStudent} col="s12 m8" list={this.state.students}/>
          <AddStudent col="s12 m4" add={this.addStudent} />
        </div>
      </div>
    );
  }
}

export default App;
