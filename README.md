
**Context Translator Chrome Extension**
-
___
>A Chrome Extension developed for Hajin Lim's **"Beyond Translation: Design and Evaluation of Emotion and Contextual Knowledge Support Interfaces for Foreign Language Social Media Posts"** project at Cornell University.

### **Introduction**
___
As various Internet-based communication tools have become prevalent, it is now easy to communicate with friends who are using different languages. One of the main ways used to keep in contact with foreign friends is through posts on social media. Although popular social network sites such as Facebook now provide machine translation features to allow users to translate languages they would never understand otherwise, partial machine translation can be unclear and still leaves many people unable to make sense of foreign posts. Without truly knowing what these posts mean, English-speakers remain reluctant to interact with content they do not fully understand.

To help people to understand foreign language posts better, we designed and developed a Chrome extension that provides emotional and contextual information (such as culture and unknown entities) about the text contents of foreign language posts using natural language analysis APIs in addition to machine translation.

If you have any questions, please contact:
Hajin Lim at hl934@cornell.edu

### **Getting Started**
___
In order to use the Context Translator, each user must first have three API keys generated from three different services (Google Translate, Textrazor, and Watson's Natural Language Understanding) which can be entered at the top of context.js.
```javascript
var googleKey = 'google API key';
var textRazorKey = 'textRazor API key';
var watsonUsername = 'watson Username';
var watsonPassword = 'watson Password';
```
#### **Google Translate**
- To acquire the Google API key, please follow the instructions on this page: 
https://support.google.com/cloud/answer/6158862?hl=en	

#### **Text Razor**
- To acquire a free Text Razor API key, please fill out this form:
https://www.textrazor.com/signup

#### **Watson's Natural Language Understanding**
- First, sign up for an account at this Link:  
- https://console.bluemix.net/registration/ 
- Then, click the menu icon at the top left of the page and select **Services** > **Watson** 
- Once on the Watson Services page, click the "**Create Watson Service**" button and select "**Natural Language Understanding**"
- Click "**Create**"
- Navigate to the **Natural Language Understanding** service page 
	- clicking "create" should automatically navigate there; if it does not, select
	**Menu** > **Watson** and then "**Natural Language Understanding**" 
- Click the menu icon on the left of the page and select "**View Credentials**" -
 your credentials should be laid out like this:
```json
{
	"url":
"https://gateway.watsonplatform.net/natural-language-understanding/api",
	"username": "username",
	"password" : "password"
}
```


### **Installation**
___
1. Download the **Context Translator** into the directory of your choice.
2. Open a Chrome window and click the button in the upper right hand corner to navigate to **More Tools** > **Extensions**.
3. On the Extensions page, check the "**Developer Mode**" box.
4. Click the "**Load unpacked extension...**" button.
5. Select the folder containing the **Context Translator** Chrome Extension.
6. Navigate to Facebook and begin using the Context Translator!

### **How to Use**
___
1. Hover over a post written in a non-English language
2. Click the "**Analyze**" button that appears to begin context analysis.
	- Click the "**Keyword Analysis**" button to begin analyzing keywords - clicking the highlighted keyword will display more information about the selected word
	- Click the "**Emotion Analysis**" button to begin emotion and sentiment analysis - the sentiment of the post, as well as the emotions most likely present, will be displayed.

