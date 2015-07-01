---
title: Rock, Paper, Scissors
excerpt: A few days ago, a friend of mine sent me a curious message. He said, "I am amazed at how short you can make a rock-paper-scissors game in code." He then posted what, to me, seemed like a lot of code for what it was trying to do. I figured that there must be a better way.
layout: generic
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

A few days ago, a friend of mine sent me a curious message. He said, "I am amazed at how short you can make a rock-paper-scissors game in code." He then posted what, to me, seemed like a lot of code for what it was trying to do. I figured that there must be a better way.

Here is the Python code that my friend sent me:

```
winning_list = {
    'Shield': {
        'Lunge': True
    },
    'Lunge': {
        'Counter': True
    },
    'Counter': {
        'Shield': True
    }
}

# Return -1 if p1 wins, 0 for a tie, or 1 if p2 wins
def judge(p1_choice, p2_choice):
    if p1_choice == p2_choice:
        return 0
    else:
        # Return False if a value is not in the winning_list dictionary
        p1_win = winning_list[p1_choice].get(p2_choice, False)
        return -1 if p1_win else 1
```

The goal was to find a function that determines a winner based on the two inputs provided. Each of the two inputs can only have one of three possible values (rock, paper, scissors), and the result can end in one of three ways (tie, player 1 wins, player 2 wins). Therefore, we can describe the function we are looking for as follows:

$$
F: \mathbb{F}_3 \times \mathbb{F}_3 \rightarrow \mathbb{F}_3
$$

I'll take a brief moment to explain the terminology above in case you're not familiar. First of all, \\(\mathbb{F}\_3\\) denotes the field over 3. You can check out [the wikipedia page](http://en.wikipedia.org/wiki/Field_%28mathematics%29) if you want to know specifically what a field is, but for our purposes, I'll describe it quickly. Essentially, \\(\mathbb{F}\_3\\) is the set of all integers \\(\mathbb{Z}\\) modulo 3, i.e. \\(\frac{\mathbb{Z}}{3\mathbb{Z}}\\) or the set \\(\\{0, 1, 2\\}\\). This makes sense because we can enumerate the three options - rock, paper, scissors - as the numbers 0, 1, and 2. Similarly, we can enumerate the three outcomes - tie, player 1 wins, player 2 wins - as the numbers 0, 1, 2.

The mathematical description above means that the domain of our function (i.e. the set of possible inputs) is the cross product of \\(\mathbb{F}\_3\\) and \\(\mathbb{F}\_3\\), which can also be denoted \\(\mathbb{F}\_3^2\\). This simply means that the input is a pair of two elements each from \\(\mathbb{F}\_3\\). The range of the function is \\(\mathbb{F}\_3\\) because we have three possible outcomes.

We have a finite set of inputs and a finite set of outputs. We can construct a function, therefore, that maps the inputs to the outputs according to the rules of rock paper scissors. Now, to figure out what this function is, we can look at the inputs and outputs and see whether we can see any patterns.

I drew a table like the one below to see if I could find a pattern between the inputs and outputs. Recall that 0 is rock, 1 is paper, and 2 is scissors. Similarly, an outcome of 0 is a tie, 1 implies player 1 won, and 2 implies player 2 won.

Player 1 Input|Player 2 Input|Output
-|-|-
0|0|0
0|1|2
0|2|1
1|0|1
1|1|0
1|2|2
2|0|2
2|1|1
2|2|0

Now, because we are working in \\(\mathbb{F}\_3\\), arithmetic operates under modulo 3. For example, \\(2+2=1\\) and \\(1-2=2\\). Call Player 1's Input \\(P\_1\\) and Player 2's Input \\(P\_2\\). Append this table with the calculation \\(P\_1-P\_2\\) keeping in mind that we are operating in \\(\mathbb{F}\_3\\).

\\(P\_1\\)|\\(P\_2\\)|Output|\\(P\_1-P\_2\\)
-|-|-|-
0|0|0|0
0|1|2|2
0|2|1|1
1|0|1|1
1|1|0|0
1|2|2|2
2|0|2|2
2|1|1|1
2|2|0|0

We see that \\(P\_1-P\_2\\) is exactly the output. Therefore, we can define a function to determine the outcome of a rock-paper-scissors game as follows:

```
def judge(p1, p2):
    return (p1 - p2) % 3
```

This is a good deal simpler than the original code.

**Update:** Based on the responses I've gotten, I feel I need to do a bit of clarification. My meaning when I say that the function I came up with is "simpler" is that it involves less logical constructs overall. It's shorter. I'm not advocating that this is the kind of code that should be used in production, especially not without a comment that explains it somewhat. This was an exercise in making "cute" code and largely a response to my friend's statement "I am amazed at how short you can make a rock-paper-scissors game in code." To me, that sounded like a challenge - I wanted to make it shorter. The logic of rock, paper, scissors is fairly simple already and doesn't really need to be optimized on modern systems, but this kind of thinking might help with larger problems that would benefit from this kind of optimization.

A side note - I found that according to JavaScript, `-1 % 3 = -1`. Java, C, C++, and probably other languages return `-1` for this operation as well. Python, more correctly in my opinion, returns `2`. This is because the modulus operator is defined differently across the different languages. Curious.

