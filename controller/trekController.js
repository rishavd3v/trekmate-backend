const { getClient } = require("../db/utils")

const getAllTreks = async (req, res) => {
    try{
        const client = await getClient();
        const {rows} = await client.query("SELECT * FROM TREKS");
        const completeTreks = [];

        for(let i = 0; i < rows.length; i++){
            const trek = rows[i];
            const id = trek.id;
            const [months, highlights, inclusion, exclusion, itinerary, faq] = await Promise.all([
                client.query('SELECT season FROM trek_months WHERE trek_id = $1', [id]),
                client.query('SELECT highlight FROM trek_highlights WHERE trek_id = $1', [id]),
                client.query('SELECT highlight FROM trek_inclusion WHERE trek_id = $1', [id]),
                client.query('SELECT highlight FROM trek_exclusion WHERE trek_id = $1', [id]),
                client.query('SELECT title, body FROM trek_itinerary WHERE trek_id = $1', [id]),
                client.query('SELECT question, answer FROM trek_faq WHERE trek_id = $1', [id]),
            ]);
            
            completeTreks.push({
                ...trek,
                months: months.rows.map((m) => m.season),
                highlights: highlights.rows.map((h) => h.highlight),
                inclusion: inclusion.rows.map((i) => i.highlight),
                exclusion: exclusion.rows.map((e) => e.highlight),
                itinerary: itinerary.rows,
                faq: faq.rows,
            });
        }

        res.json(completeTreks);
        console.log("Data fetched successfully");
    }
    catch(err){
        console.log("Error fetching data",err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {getAllTreks};