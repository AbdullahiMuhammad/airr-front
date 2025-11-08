export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    state: "",
    localGov: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setForm({ ...form, state: value, localGov: "" });  // Reset localGov when state changes
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirm || !form.state || !form.localGov || !form.address) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      state: form.state,
      localGov: form.localGov,
      address: form.address,
      phone: form.phone,  // Add phone if necessary
    };

    console.log("Payload being sent to API:", payload);  // Debugging payload

    try {
      const response = await signUp(payload); // Pass the correct payload
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => navigate("/login"), 500);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-black to-yellow-500 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-400 via-yellow-300 to-green-700 opacity-10 pointer-events-none"></div>

        <div className="flex justify-center mb-6">
          <img src={logo} alt="Org Logo" className="w-16 h-16 object-contain" />
        </div>

        <h1 className="text-center text-3xl font-bold mb-6 text-green-700 tracking-tight">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-4 relative z-10 mt-8 mb-8 overflow-y-auto max-h-[calc(100vh-400px)]"
        >
          <InputField
            label="First Name"
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />

          <InputField
            label="Last Name"
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
          />

          {/* State Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-[15px] p-2 focus:ring-2 focus:ring-green-400  focus:outline-none"
            >
              <option value="">Select State</option>
              {Object.keys(statesAndLGAs).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Local Government Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Local Government</label>
            <select
              name="localGov"
              value={form.localGov}
              onChange={handleChange}
              disabled={!form.state}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none overflow-y-auto"
            >
              <option value="">
                {form.state ? "Select Local Government" : "Select a State first"}
              </option>
              {form.state &&
                statesAndLGAs[form.state].map((lga) => (
                  <option
