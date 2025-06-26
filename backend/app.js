import app from "#server";
import cors from 'cors';

import "#syncRoutes";
import "#models";

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
