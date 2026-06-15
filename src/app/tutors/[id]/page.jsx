useEffect(() => {
 
  fetch(`http://localhost:5000/tutors/${params.id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Tutor not found");
      return res.json();
    })
    .then((data) => {
      setTutor(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, [params.id]);