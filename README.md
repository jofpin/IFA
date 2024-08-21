# IFA

![IFA](images/gh-cover.png)

## Disk Flooding Attack via IndexedDB

**IFA** is an Proof of Concept (**PoC**) that demonstrates how an attacker can exploit the IndexedDB API in popular web browsers to carry out a disk flooding attack. This attack specifically leverages the lack of restrictions in IndexedDB, allowing the browser to store data without effective limits, which can rapidly consume a user’s disk space by injecting hundreds of MBs per second. This can lead to significant system performance degradation, exhaustion of storage, and, in extreme cases, a total system crash.

## Why Should You Be Concerned?

In a world where we increasingly rely on web applications for productivity and entertainment, a vulnerability that can render your device unusable within minutes is a serious threat. **IFA** reveals how the lack of restrictions in IndexedDB can be exploited to create a scenario where a user loses control of their system due to a simple script.

### Direct Impact on Users

Executing **IFA** can have the following devastating effects:

1.  **Massive Performance Degradation**: The massive and continuous storage of data in IndexedDB causes the disk's input/output operations to become saturated, leading to a significant decrease in system speed. Users will experience extremely slow response times, making it difficult to use their devices normally.
    
2.  **Rapid Storage Exhaustion**: In a matter of minutes, the attack can consume gigabytes of disk space. Once storage is exhausted, the system becomes incapable of performing basic operations like saving documents, installing updates, or even opening new applications.
    
3.  **System Instability and Crash**: When the disk is completely filled, the operating system may become unstable or even crash, resulting in the loss of unsaved data and potentially damaging critical system files. Affected users may face the need to restore their system or even perform a complete reinstallation of the operating system.
    
### Vulnerable Browsers

**IFA** affects a wide range of browsers:

-   **Vulnerable Browsers**: Chrome, Opera, Edge, Brave, Safari and (all Chromium-based).
-   **Secure Browser**: Firefox has proven to be resistant to this attack due to its stricter restrictions on IndexedDB storage.

## Attack Architecture

**IFA** uses a carefully designed strategy to exploit the lack of restrictions in the IndexedDB API, maximizing the impact of the attack while preventing the browser from crashing prematurely:

1.  **Generation of Unique Identifiers**: The script generates multiple databases with random names, ensuring no conflicts and that each database can store large amounts of data.
    
2.  **Injection of 8 MB Blobs**: **IFA** uses 8 MB blobs (large data fragments) composed of repetitive text and image data. This size choice is crucial as it allows large volumes of data to be stored efficiently without causing an immediate browser crash. By using blobs of a specific size, **IFA** can flood the user's disk consistently and persistently, evading security mechanisms based on the browser tab's memory buffer that might stop the attack if excessive or rapid writing operations are detected.
    
3.  **Data Storage Loops**: The 8 MB blobs are repeatedly stored in the IndexedDB object, creating a continuous flow of data that quickly fills up disk space. **IFA** injects hundreds of MBs per second, ensuring rapid consumption of the user's storage space while avoiding immediate browser crashes.
    
4.  **Disk Saturation**: The process continues indefinitely, storing data until the disk space is exhausted, leading to a series of issues that can paralyze the system.
    

## Potential Attack Scenarios

The **IFA** exploit demonstrates how a severe vulnerability in the **IndexedDB API** can be weaponized. Here are some scenarios where an attacker could leverage this PoC to cause significant damage:


1.   **Exploitation via Cross-Site Scripting (XSS):** If an attacker discovers an XSS vulnerability on a legitimate website, they could inject the **IFA** script into the site. When users visit the compromised page, the script would automatically execute in their browsers, rapidly filling up their disk space. This could lead to significant system slowdown or even a crash, particularly for users who are unaware of the attack.
    
2.   **Compromised Third-Party JavaScript Libraries:** Many websites and web applications rely on third-party JavaScript libraries. If an attacker were to compromise one of these libraries by injecting the **IFA** script, any website using the affected library could unknowingly become a vector for the attack. This would result in widespread disk flooding on any user’s device that loads the compromised script.
    
3.   **Malicious Browser Extensions:** Attackers could develop or compromise browser extensions to include the **IFA** script. Once installed, the extension could execute the script silently in the background, flooding the user’s disk space every time they open their browser. This scenario is particularly dangerous as browser extensions often have broad permissions.
    
4.   **Infected Web Advertisements:** An attacker could place a malicious advertisement containing the **IFA** script on a legitimate website. When users load the page with the infected ad, the script would execute and start consuming their disk space. This method could target a large number of users, especially on high-traffic websites.
    
5.  **Phishing Campaigns:** Attackers could send phishing emails that direct victims to a website hosting the **IFA** script. Once the target visits the malicious website, the script would execute and start filling up their disk space. This method could be particularly effective in targeted attacks against individuals or organizations.

## Demo: See **IFA** in Action

To help you better understand the impact of **IFA**, I’ve created a demonstration on a dedicated website. This web demo is designed to make it easy for you to see the exploit in action and grasp its potential effects.

1.  **Explore the Live Demo**: Visit [**https://ifa.run**](https://ifa.run) to interact with the live demo. This will let you experience firsthand how this attack can affect your browser and system. I created this demo to ensure that anyone can easily test and see the consequences of the exploit. Please remember to perform this test cautiously and within a controlled environment.

2. **Hidden Injection Demo**: For a more subtle demonstration, visit [**https://ifa.run/hidden.html**](https://ifa.run/hidden.html). This version operates invisibly, directly performing the injection without any visible graphics or user interface like the main demo.

3.  **Watch the PoC Video**: If you prefer a guided explanation, I’ve also created a demonstration video. In the video, I walk you through the execution of **IFA** and show you the effects it can cause: [PoC Video](https://youtu.be/8EbKV3zMRbc).


## Testing the PoC Locally

If you're interested in testing the PoC locally, follow these straightforward steps. We'll guide you through including the **[IFA.js](IFA.js)** script and running the exploit with custom data.

#### Step 1: Include the Script

First, you need to include the **[IFA.js](IFA.js)** script in your HTML file. You have two options:

1.  **Local Script**: If you have the **[IFA.js](IFA.js)** file downloaded, you can include it directly:
 
```html
<script  src="IFA.js"></script>
```
    
2.  **CDN Link**: Alternatively, you can load the script from a CDN, which is faster and more convenient:

```html
<script  src="https://cdn.jsdelivr.net/gh/jofpin/IFA/IFA.js"></script>
```

Using the CDN link is especially useful for testing the exploit on different websites or web applications without needing to host the script yourself.

#### Step 2: Customize and Execute the Exploit

Once you've included the script, you're ready to run the exploit. The **IFA** script allows you to customize the data that will be injected. Here's how you do it:

1.  **Insert Your Base64 Image**: Convert an image to Base64 format and insert it into the `img` field.
    
2.  **Insert Your Custom Text**: Input any text you'd like to use in the `txt` field.
    

Here’s an example of how to run the exploit:

```js

IFA.run({
   img: "data:image/webp;base64,UklGRpZBAwBXRUJQV...", // Insert your Base64 image here
   txt: "IFA" // Insert your custom text
});
```

#### Explanation:

-   **img**: This is where you place the Base64-encoded image. The image will be injected directly, ensuring the exploit runs faster and more efficiently by avoiding external server requests.
    
-   **txt**: Here, you input the text that will be stored in the database. You can customize this text to test different scenarios.
    

#### Step 3: Observe the Results

After executing the script, observe how the exploit behaves. You should notice:

-   **Disk Space Usage**: The disk space should rapidly fill up as the script continuously writes data to IndexedDB.
    
-   **System Performance**: You may observe a significant degradation in system performance, with slower response times and potential instability.
    
-   **Browser Behavior**: The exploit should avoid crashing the browser immediately, instead keeping the attack persistent, eventually leading to a full disk.
    

### Important Notes:

-   **Use a Controlled Environment**: Use a controlled environment: Make sure you test in a controlled environment, as this PoC can cause system instability.
    
-   **Base64 Encoding**: By using Base64 for the image, the injection is handled locally, which prevents potential errors and makes the exploit more effective.

## Recommendations for Browsers Improvement

The exposure of this vulnerability should serve as a call to action for browser developers. Here are some measures that could be implemented to prevent such attacks:

-   **Implementation of Quota Limits**: Browsers should establish strict limits on the amount of storage a web application can use via IndexedDB. This would prevent a malicious script from consuming all disk space.
    
-   **Detection of Anomalous Behavior**: Browsers should develop mechanisms to detect and block anomalous behavior, such as the mass creation of databases or the storage of large amounts of data in a short period.
    
-   **User Alerts**: When unusual storage usage is detected, the browser should alert the user and offer the option to block the application attempting to exploit the vulnerability.
    

## Final Remarks

The creation of **IFA** is an effort to show what could happen if the necessary measures are not taken to secure the web technologies we use every day. **IFA** is not just a technical demonstration but a warning to the entire tech industry: in our quest for innovation, we must not compromise security.

> **Code has the power to build or destroy. Let's make sure our legacy is one of construction, not destruction.** - [Jose Pino](https://x.com/jofpin)

## Disclaimer

This PoC is intended solely for educational and research purposes. Its execution should be carried out in controlled environments, and it should not be used on production systems or devices containing important data. Misuse of this PoC could result in significant damage, and it is the user's responsibility to ensure it is employed ethically.

## License

The content of this project itself is licensed under the [Creative Commons Attribution 3.0 license](http://creativecommons.org/licenses/by/3.0/us/deed.en_US), and the underlying source code used to format and display that content is licensed under the [MIT license](LICENSE).

Copyright (c) 2024 by [**Jose Pino**](https://x.com/jofpin)