
# import base64
# import time
# import pandas as pd
# from openai import OpenAI

# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait, Select
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.chrome.options import Options


# # -------------------------
# # OPENAI
# # -------------------------

# client = OpenAI(api_key="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")

# # 

# # -------------------------
# # START BROWSER (HEADLESS)
# # -------------------------
# # -------------------------

# import subprocess

# def cleanup_selenium():
#     try:
#         subprocess.run(
#             "taskkill /F /IM chromedriver.exe",
#             shell=True,
#             stdout=subprocess.DEVNULL,
#             stderr=subprocess.DEVNULL
#         )

#         subprocess.run(
#             "taskkill /F /IM chrome.exe /FI \"WINDOWTITLE eq data:*\"",
#             shell=True,
#             stdout=subprocess.DEVNULL,
#             stderr=subprocess.DEVNULL
#         )

#         print("Old Selenium drivers closed")

#     except:
#         pass


# cleanup_selenium()


# # -------------------------
# # START BROWSER
# # -------------------------

# chrome_options = Options()

# chrome_options.add_argument("--headless=new")
# chrome_options.add_argument("--window-size=1920,1080")

# chrome_options.add_argument("--disable-gpu")
# chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument("--disable-dev-shm-usage")

# chrome_options.add_argument("--disable-extensions")
# chrome_options.add_argument("--disable-infobars")

# chrome_options.add_argument("--disable-notifications")
# chrome_options.add_argument("--disable-popup-blocking")

# chrome_options.add_argument("--log-level=3")

# driver = webdriver.Chrome(options=chrome_options)



# # chrome_options = Options()
# # chrome_options.add_argument("--headless=new")
# # chrome_options.add_argument("--window-size=1920,1080")
# # chrome_options.add_argument("--disable-gpu")
# # chrome_options.add_argument("--no-sandbox")

# # driver = webdriver.Chrome(options=chrome_options)
# wait = WebDriverWait(driver, 10)

# driver.get("https://judgments.ecourts.gov.in/pdfsearch/")

# print("Website opened")


# # -------------------------
# # CAPTCHA SOLVER
# # -------------------------
# def solve_captcha():

#     captcha_img = wait.until(
#         EC.presence_of_element_located((By.ID, "captcha_image"))
#     )

#     captcha_img.screenshot("captcha.png")

#     with open("captcha.png", "rb") as f:
#         img_bytes = f.read()

#     img_base64 = base64.b64encode(img_bytes).decode()
#     # gpt-4.1-mini
#     # gpt-4.1
#     response = client.chat.completions.create(
#         model="gpt-4.1-mini",
#         messages=[
#             {
#                 "role":"user",
#                 "content":[
#                     {"type":"text","text":"Read the captcha text. Return only the characters."},
#                     {
#                         "type":"image_url",
#                         "image_url":{
#                             "url":f"data:image/png;base64,{img_base64}"
#                         }
#                     }
#                 ]
#             }
#         ],
#         max_tokens=10
#     )

#     text = response.choices[0].message.content.strip()

#     print("Captcha detected:", text)

#     return text


# # -------------------------
# # SOLVE CAPTCHA
# # -------------------------

# while True:

#     captcha_text = solve_captcha()

#     if len(captcha_text) < 4:
#         print("Weak reading retry")
#         continue

#     captcha_input = driver.find_element(By.ID, "captcha")
#     captcha_input.clear()
#     captcha_input.send_keys(captcha_text)

#     driver.find_element(By.ID, "main_search").click()

#     time.sleep(2)

#     if "Invalid Captcha" in driver.page_source:

#         print("Captcha incorrect. Reloading page...")

#         driver.refresh()

#         wait.until(
#             EC.presence_of_element_located((By.ID, "captcha_image"))
#         )

#         time.sleep(1)

#         continue

#     else:

#         print("Captcha solved successfully")

#         break



# # while True:

# #     captcha_text = solve_captcha()

# #     if len(captcha_text) < 4:
# #         print("Weak reading retry")
# #         continue

# #     captcha_input = driver.find_element(By.ID, "captcha")
# #     captcha_input.clear()
# #     captcha_input.send_keys(captcha_text)

# #     driver.find_element(By.ID, "main_search").click()

# #     time.sleep(2)

# #     # if "Invalid Captcha" in driver.page_source:

# #     #     print("Captcha incorrect. Refreshing...")

# #     #     refresh_btn = driver.find_element(
# #     #         By.XPATH,
# #     #         "//img[contains(@src,'refresh-btn.png')]"
# #     #     )

# #     #     refresh_btn.click()
# #     #     time.sleep(2)

# #     # else:
# #     #     print("Logged In successfully")
# #     #     break

# #     if "Invalid Captcha" in driver.page_source:

# #             print("Captcha incorrect. Reloading page...")

# #             driver.refresh()

# #             print("Page refreshed, waiting for new captcha...")

# #             wait.until(
# #                 EC.presence_of_element_located((By.ID, "captcha_image"))
# #             )

# #             time.sleep(2)

# #             continue
# # -------------------------------
# # OPEN "Decision Date"
# # -------------------------------
# decision_dropdown = wait.until(
#     EC.element_to_be_clickable((By.XPATH,"//a[contains(.,'Decision Date')]"))
# )

# driver.execute_script("arguments[0].click();", decision_dropdown)

# time.sleep(2)


# # -------------------------------
# # SELECT PAST WEEK
# # -------------------------------
# week_filter = wait.until(
#     EC.element_to_be_clickable((By.ID,"exampleRadios2"))
# )

# driver.execute_script("arguments[0].click();", week_filter)

# # print("Past Week selected")

# time.sleep(2)


# # -------------------------------
# # CLICK SEARCH
# # -------------------------------
# search_btn = wait.until(
#     EC.element_to_be_clickable((By.XPATH,"//button[contains(@onclick,'get_details_searchclick')]"))
# )

# driver.execute_script("arguments[0].click();", search_btn)

# # print("Search clicked")

# time.sleep(3)

# print("Started Data Extraction")

# # -------------------------------
# # SET SHOW ENTRIES = 1000
# # -------------------------------
# length_dropdown = wait.until(
#     EC.presence_of_element_located((By.NAME,"example_pdf_length"))
# )

# Select(length_dropdown).select_by_value("1000")

# print("Set rows per page to 1000")

# time.sleep(2)


# # -------------------------------
# # SCRAPE DATA
# # -------------------------------
# data = []
# page = 1

# while True:

#     print("Scraping page:", page)

#     rows = wait.until(
#         EC.presence_of_all_elements_located((By.CSS_SELECTOR,"tbody tr"))
#     )

#     print("Rows found:", len(rows))

#     for row in rows:

#         try:

#             case_cell = row.find_elements(By.TAG_NAME,"td")[1]

#             text = case_cell.text.replace("\n"," ").strip()

#             if text:
#                 data.append({"case_details": text})

#         except:
#             pass

#     try:

#         next_btn = driver.find_element(By.ID,"example_pdf_next")

#         if "disabled" in next_btn.get_attribute("class"):

#             print("Reached last page")
#             break

#         driver.execute_script("arguments[0].click();", next_btn)

#         page += 1

#         time.sleep(2)

#     except:
#         break


# # -------------------------------
# # SAVE EXCEL
# # -------------------------------
# df = pd.DataFrame(data)

# print("Total records:", len(df))

# # df.to_excel("ecourts_last_week.xlsx", index=False)

# import os

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# DATA_DIR = os.path.join(BASE_DIR, "data")

# os.makedirs(DATA_DIR, exist_ok=True)

# output_file = os.path.join(DATA_DIR, "ecourts_last_week.xlsx")

# df.to_excel(output_file, index=False)


# driver.quit()

# print("Extraction completed")





















import base64
import time
import pandas as pd
from openai import OpenAI
import os
import sys
import os
# FIX UNICODE
sys.stdout.reconfigure(encoding='utf-8')

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# OPENAI

client = OpenAI(api_key="nana")

m=sk-proj-
n=kAIKVbHEfTtx2Gz43GJiJ4u93yFcG56XKOR5mT2bV-ghaGa2bKxgNWdDgoKI17-CDk4frRYMUZT3BlbkFJrBINRwpWJTKM9FT_
0=R6oXKL4MOYniXlbdUUgxirLCpbyjuUZhbAdOnpkxsIU4VvkYPUnETFKRwA

def run_scraper():

    print("Starting scraper...")

    chrome_options = Options()

    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-infobars")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--disable-popup-blocking")
    chrome_options.add_argument("--remote-debugging-port=9222")

    # ✅ IMPORTANT FOR RENDER


    if os.name != "nt":  # Linux (Render)
        chrome_options.binary_location = "/usr/bin/chromium"

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=chrome_options
    )

    wait = WebDriverWait(driver, 20)

    def wait_for_loader():
        try:
            WebDriverWait(driver, 10).until(
                EC.invisibility_of_element_located((By.ID, "loadMe"))
            )
        except:
            pass

    try:
        driver.get("https://judgments.ecourts.gov.in/pdfsearch/")
        print("Website opened")

        time.sleep(5)
        wait_for_loader()

        def solve_captcha():

            wait_for_loader()

            captcha_img = wait.until(
                EC.visibility_of_element_located((By.ID, "captcha_image"))
            )

            captcha_img.screenshot("captcha.png")

            with open("captcha.png", "rb") as f:
                img_base64 = base64.b64encode(f.read()).decode()

            response = client.chat.completions.create(
                model="gpt-4.1-mini",
                messages=[{
                    "role":"user",
                    "content":[
                        {"type":"text","text":"Read the captcha text. Return only characters."},
                        {"type":"image_url","image_url":{"url":f"data:image/png;base64,{img_base64}"}}
                    ]
                }],
                max_tokens=10
            )

            text = response.choices[0].message.content.strip()
            print("Captcha:", text)
            return text

        # CAPTCHA LOOP
        while True:

            captcha_text = solve_captcha()

            if len(captcha_text) < 4:
                continue

            driver.find_element(By.ID, "captcha").clear()
            driver.find_element(By.ID, "captcha").send_keys(captcha_text)

            driver.find_element(By.ID, "main_search").click()

            time.sleep(2)
            wait_for_loader()

            if "Invalid Captcha" in driver.page_source:
                print("Retry captcha")
                driver.refresh()
                time.sleep(3)
                wait_for_loader()
            else:
                print("Captcha solved")
                break

        # FILTER
        wait_for_loader()

        decision_dropdown = wait.until(
            EC.presence_of_element_located((By.XPATH,"//a[contains(.,'Decision Date')]"))
        )
        driver.execute_script("arguments[0].click();", decision_dropdown)

        time.sleep(2)
        wait_for_loader()

        week_filter = wait.until(
            EC.presence_of_element_located((By.ID,"exampleRadios2"))
        )
        driver.execute_script("arguments[0].click();", week_filter)

        time.sleep(2)
        wait_for_loader()

        search_btn = wait.until(
            EC.presence_of_element_located((By.XPATH,"//button[contains(@onclick,'get_details_searchclick')]"))
        )
        driver.execute_script("arguments[0].click();", search_btn)

        time.sleep(3)
        wait_for_loader()

        print("Extracting data...")

        length_dropdown = wait.until(
            EC.presence_of_element_located((By.NAME,"example_pdf_length"))
        )
        Select(length_dropdown).select_by_value("1000")

        time.sleep(2)

        data = []
        page = 1

        while True:

            print("Page:", page)

            rows = wait.until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR,"tbody tr"))
            )

            for row in rows:
                try:
                    text = row.find_elements(By.TAG_NAME,"td")[1].text.replace("\n"," ").strip()
                    if text:
                        data.append({"case_details": text})
                except:
                    pass

            try:
                next_btn = driver.find_element(By.ID,"example_pdf_next")

                if "disabled" in next_btn.get_attribute("class"):
                    break

                driver.execute_script("arguments[0].click();", next_btn)

                page += 1
                time.sleep(2)

            except:
                break

        df = pd.DataFrame(data)

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        DATA_DIR = os.path.join(BASE_DIR, "data")

        os.makedirs(DATA_DIR, exist_ok=True)

        file_path = os.path.join(DATA_DIR, "ecourts_last_week.xlsx")

        df.to_excel(file_path, index=False)

        print("Saved:", file_path)

        return {"status": "success", "records": len(df)}

    except Exception as e:
        print("Error:", str(e))
        return {"status": "failed", "error": str(e)}

    finally:
        driver.quit()
        print("Browser closed")

if __name__ == "__main__":
    run_scraper()



