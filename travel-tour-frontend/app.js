const apiUrl = 'http://localhost:3000/tour';
async function fetchTours() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('Fetched data:', data); 

        if (data.data && data.data.tour_options) { 
            const tourList = document.getElementById('tour-options');
            tourList.innerHTML = ''; 

            data.data.tour_options.forEach(tour => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>Tour ID:</strong> ${tour.tour_id}<br>
                    <strong>Title:</strong> ${tour.title}<br>
                    <strong>Description:</strong> ${tour.description}<br>
                    <strong>Duration:</strong> ${tour.duration} ${tour.duration_unit}<br>
                    <strong>Pick-Up:</strong> ${tour.pick_up}<br>
                    <strong>Meeting Point:</strong> ${tour.meeting_point}<br>
                    <strong>Drop-Off:</strong> ${tour.drop_off}<br>
                    <button id="delete-btn" onclick="deleteTour('${tour._id}')">Delete</button>
                    <button id="edit-btn" onclick="editTour('${tour._id}', '${tour.tour_id}', '${tour.title}', '${tour.description}', '${tour.pick_up}', '${tour.meeting_point}', '${tour.drop_off}', '${tour.duration}', '${tour.duration_unit}')">Edit</button>
                `;
                tourList.appendChild(li);
            });
        } else {
            console.error('Error fetching tours: Invalid data structure', data);
        }
    } catch (error) {
        console.error('Error fetching tours:', error);
    }
}
async function addTour(event) {
    event.preventDefault();

    const tourData = {
        tour_id: document.getElementById('tour_id').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        pick_up: document.getElementById('pick_up').value,
        meeting_point: document.getElementById('meeting_point').value,
        drop_off: document.getElementById('drop_off').value,
        duration: document.getElementById('duration').value,
        duration_unit: document.getElementById('duration_unit').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tourData),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Tour added successfully!');
            fetchTours(); 
            document.getElementById('tour-form').reset(); 
        } else {
            alert('Error adding tour: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error adding tour:', error);
    }
}
function editTour(id, tour_id, title, description, pick_up, meeting_point, drop_off, duration) {
    document.getElementById('tour_id').value = tour_id;
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('pick_up').value = pick_up;
    document.getElementById('meeting_point').value = meeting_point;
    document.getElementById('drop_off').value = drop_off;
    document.getElementById('duration').value = duration;

    document.getElementById('tour-form').onsubmit = async function(event) {
        event.preventDefault();
        const updatedTourData = {
            tour_id: document.getElementById('tour_id').value,
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            pick_up: document.getElementById('pick_up').value,
            meeting_point: document.getElementById('meeting_point').value,
            drop_off: document.getElementById('drop_off').value,
            duration: Number(document.getElementById('duration').value), 
            duration_unit: document.getElementById('duration_unit').value,
        };

        console.log("Updated Data Sent to API:", updatedTourData);

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTourData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`${updatedTourData.title} updated successfully!`);
                fetchTours(); 
                document.getElementById('tour-form').reset(); 
                document.getElementById('tour-form').onsubmit = addTour;
            } else {
                alert('Error updating tour: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error updating tour:', error);
        }
    };
}
async function deleteTour(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
            alert('Tour deleted successfully!');
            fetchTours(); 
        } else {
            alert('Error deleting tour: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error deleting tour:', error);
    }
}
fetchTours();
document.getElementById('tour-form').onsubmit = addTour;



