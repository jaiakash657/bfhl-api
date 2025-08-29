const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const USER = {
    fullName: "e_s_jai_akash",
    dob: "25062005",
    email: "akash.22bce7824@vitapstudent.ac.in",
    rollNumber: "22BCE7824"
};

function getUserId() {
    return `${USER.fullName.replace(/\s+/g, "_")}_${USER.dob}`;
}

const isNumber = (char) => !isNaN(char) && char.trim() !== '';
const isAlphabet = (char) => /^[A-Za-z]+$/.test(char);
const isSpecialCharacter = (char) => !isNumber(char) && !isAlphabet(char) && char.trim() !== '';

function createAlternatingCaps(alphabets) {
    const chars = alphabets
        .join('')
        .split('')
        .filter(isAlphabet)
        .map(c => c.toLowerCase())
        .reverse();

    return chars
        .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
        .join('');
}

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        let oddNumbers = [], evenNumbers = [], alphabets = [], specialCharacters = [];
        let numberSum = 0;

        for (let item of data) {
            const str = String(item);

            if (isNumber(str)) {
                const num = parseInt(str, 10);
                (num % 2 === 0 ? evenNumbers : oddNumbers).push(str);
                numberSum += num;
            }
            else if (isAlphabet(str)) {
                alphabets.push(str.toUpperCase());
            }
            else if (isSpecialCharacter(str)) {
                specialCharacters.push(str);
            }
            else {
                if ([...str].some(isAlphabet)) alphabets.push(str.toUpperCase());
                else specialCharacters.push(str);
            }
        }

        const concatString = createAlternatingCaps(alphabets);

        const response = {
            is_success: true,
            user_id: getUserId(),
            email: USER.email,
            roll_number: USER.rollNumber,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets,
            special_characters: specialCharacters,
            sum: numberSum.toString(),
            concat_string: concatString
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal server error" });
    }
});

app.get('/bfhl', (req, res) => res.json({ operation_code: 1 }));

app.get('/', (req, res) => res.json({
    message: "BFHL API is running!",
    endpoints: { POST: "/bfhl", GET: "/bfhl" }
}));

app.use((err, req, res, next) => {
    res.status(500).json({ is_success: false, error: "Something went wrong!" });
});

app.use('*', (req, res) =>
    res.status(404).json({ is_success: false, error: "Endpoint not found" })
);

module.exports = app;