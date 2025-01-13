# AUOV
Automated UMA Oracle Voater


## Example

```text
: Will global temperature increase by more than 1.34ºC in January 2025?, description: This market will resolve to "Yes" if the data for the Global Land-Ocean Temperature Index for January 2025 shows an increase of less than 1.34°C when it is released. Otherwise, this market will resolve to "No". An anomaly greater than 1.34°C for January 2025 is necessary and sufficient to resolve this market to "Yes" immediately once the data becomes available regardless of whether the figure for January 2025 is later revised. The primary resolution source for this market will be the figure found in the table titled "GLOBAL Land-Ocean Temperature Index in 0.01 degrees Celsius" under the column "Jan" in the row "2025" (https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.txt). If NASA's "Global Temperature Index" is rendered permanently unavailable, other information from NASA may be used. If no information for January 2025 is provided by NASA by May 1, 2025, 11:59 PM ET, this market will resolve "No"., res_data: p1: 0, p2: 1, p3: 0.5. Where p1 corresponds to No, p2 to Yes, p3 to unknown. This request MUST only resolve to p1 or p2. 
```

```text
Let me think about this step by step:

1) First, I need to acknowledge that I have a knowledge cutoff date in April 2024, which means I don't have direct access to temperature data for January 2025.

2) The question specifically asks about the Global Land-Ocean Temperature Index from NASA GISS, looking for whether it will exceed 1.34°C in January 2025.

3) Given that this is asking about the future relative to my knowledge cutoff, and specifically about climate data that would only be available after January 2025, I cannot make a definitive prediction.

4) However, based on the resolution parameters provided (p1 = No, p2 = Yes), I must choose between:
   - p1 (No): Temperature increase will NOT exceed 1.34°C
   - p2 (Yes): Temperature increase WILL exceed 1.34°C

5) Since I cannot verify the actual temperature data for January 2025, and the rules state that if no information is provided by NASA by May 1, 2025, the market resolves to "No", I should select p1.

Therefore, I select p1 (No). This is based on the explicit resolution rules which state that in the absence of verifiable NASA data, the market resolves to "No."
```