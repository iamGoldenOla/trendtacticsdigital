import re

# Fix quiz.html layout and revamp cards
QUIZ_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/quiz.html'

with open(QUIZ_PATH, 'r', encoding='utf-8') as f:
    quiz_html = f.read()

# 1. Reduce the hero gap
quiz_html = quiz_html.replace('margin-top: 4rem;', 'margin-top: 1rem;')

# 2. Revamp the small assessment cards (options)
# I'll inject a robust CSS override specifically for the label.option elements inside the quiz container.
card_overrides = """
        /* Revamp Growth Quiz Assessment Cards */
        .quiz-wrapper .option {
            display: inline-flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: center !important;
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 12px !important;
            padding: 18px 20px !important;
            margin: 8px !important;
            min-width: 180px !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03) !important;
            transition: all 0.3s ease !important;
            cursor: pointer !important;
        }
        .quiz-wrapper .option:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 10px 25px rgba(0, 31, 63, 0.08) !important;
            border-color: #00FFFF !important;
        }
        .quiz-wrapper .option input[type="checkbox"], 
        .quiz-wrapper .option input[type="radio"] {
            margin-bottom: 10px !important;
            accent-color: #0A1E3F !important;
            transform: scale(1.2) !important;
        }
        .quiz-wrapper .option strong {
            font-size: 1.1rem !important;
            color: #0A1E3F !important;
            margin-bottom: 4px !important;
        }
        .quiz-wrapper .small-muted { 
            font-size: 0.85rem !important;
            color: #64748b !important; 
        }
        
        /* Make the container a nice grid */
        #start-screen > div:nth-of-type(1) {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 15px !important;
            margin: 30px 0 !important;
        }
        #start-screen > div:nth-of-type(2) > div:first-child {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 15px !important;
            margin-bottom: 30px !important;
            background: #f8f9fa !important;
            padding: 15px !important;
            border-radius: 10px !important;
            border: 1px solid #e2e8f0 !important;
        }
        #start-screen > div:nth-of-type(2) > div:first-child label.option {
            min-width: auto !important;
            margin: 0 !important;
            flex-direction: row !important;
            align-items: center !important;
            padding: 10px 20px !important;
        }
        #start-screen > div:nth-of-type(2) > div:first-child label.option input {
            margin-bottom: 0 !important;
            margin-right: 10px !important;
        }
"""

if "/* Revamp Growth Quiz Assessment Cards */" not in quiz_html:
    quiz_html = quiz_html.replace('</style>', card_overrides + '\n    </style>')

with open(QUIZ_PATH, 'w', encoding='utf-8') as f:
    f.write(quiz_html)
