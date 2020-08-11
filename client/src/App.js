import React, { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';

function App() {
	const [posts, setPosts] = useState([]);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [newData, setNewData] = useState(true);

	useEffect(() => {
		if (newData === true) {
			getPosts();
			setNewData(false);
		}
	}, [newData]);

	const getPosts = e => {
		fetch('http://localhost:4000/')
			.then(response => response.json())
			.then(data => setPosts(data))
			.catch(error => console.error(error));
	};

	const handleSubmit = e => {
		let form = e.target;
		e.preventDefault();
		let data = {
			title: title,
			body: body,
			date: Date.now(),
		};
		fetch('http://localhost:4000', {
			body: JSON.stringify(data),
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
		})
			.then(createdPost => {
				return createdPost.json();
			})
			.then(jsonedPost => {
				setPosts(jsonedPost);
				form.reset();
				setNewData(true);
			})
			.catch(error => console.log(error));
	};

	const handleChange = e => {
		if (e.target.id === 'title') setTitle(e.target.value);
		if (e.target.id === 'body') setBody(e.target.value);
	};

	const handleDelete = id => {
		fetch(`http://localhost:4000/${id}`, {
			method: 'DELETE',
		})
			.then(response => response.json())
			.then(responseData => setNewData(true));
	};

	let date;

	return (
		<div className='App'>
			<div className='createPost'>
				<h1>Create a new post</h1>
				<form action='/' method='POST' onSubmit={handleSubmit}>
					<label htmlFor='title'>
						Title: <input type='text' id='title' onChange={handleChange} />
					</label>
					<label htmlFor='body'>
						Body: <input type='text' id='body' onChange={handleChange} />
					</label>
					<button>Submit</button>
				</form>
			</div>
			<div className='allPosts'>
				<h1>All posts</h1>
				{posts.length > 0 &&
					posts.map(post => {
						date = new Date(post.date);
						return (
							<div key={post._id}>
								<h3>{post.title}</h3>
								<p>{post.body}</p>
								<p>Posted {moment(date).fromNow(true)} ago</p>
								<button onClick={() => handleDelete(post._id)}>Delete</button>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default App;
