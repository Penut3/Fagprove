
import Form from '../../components/Form/Form'


function Example() {
  return(
    <section>
      <div className='contentWidth'>
         <h1>Example Components</h1>
         <Form
          fields={[
            { type: 'title', name: 'title', label: 'Form Title' },
            { type: 'text', name: 'name', label: 'Name', required: true },
            { type: 'text', name: 'name2', label: 'Name', required: true },
            { type: 'title', name: 'title', label: 'ages' },
            { type: 'number', name: 'age', label: 'Age' },
            { type: 'number', name: 'age2', label: 'Age' },
            {
              type: 'radio',
              name: 'gender',
              label: 'Gender',
              options: ['Female', 'Male', 'Other'],
            },
             { name: 'country', label: 'Country', type: 'select', options: ['USA', 'Canada', 'Mexico'] },
          ]}
          onSubmit={(values) => console.log(values)}
        />

      </div>
    </section>
 

  ) 
}



export default Example;
