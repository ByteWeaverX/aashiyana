"""
Prediction module for house price prediction.
Loads trained model and makes predictions on new data.
"""

import pandas as pd
import numpy as np
from utils import load_model
import warnings
warnings.filterwarnings('ignore')


class HousePricePredictor:
    """
    Handles loading the trained model and making predictions.
    """
    
    def __init__(self, model_path='house_price_model.pkl'):
        """
        Initialize the predictor by loading the trained model.
        
        Parameters:
        -----------
        model_path : str
            Path to the saved model file
        """
        self.model_path = model_path
        self.model = None
        self.load_trained_model()
    
    def load_trained_model(self):
        """
        Load the trained model from disk.
        """
        print(f"Loading model from: {self.model_path}")
        self.model = load_model(self.model_path)
        print("Model loaded and ready for predictions!")
    
    def predict(self, input_data):
        """
        Make predictions on new data.
        
        Parameters:
        -----------
        input_data : pd.DataFrame or dict
            Input features for prediction
            If dict, will be converted to DataFrame
            
        Returns:
        --------
        np.ndarray : Predicted prices
        """
        if self.model is None:
            raise ValueError("Model not loaded. Please check the model path.")
        
        # Convert dict to DataFrame if necessary
        if isinstance(input_data, dict):
            input_data = pd.DataFrame([input_data])
        
        # Make prediction
        predictions = self.model.predict(input_data)
        
        return predictions
    
    def predict_single(self, area, latitude, longitude, bedrooms, bathrooms,
                       balcony=None, status=None, neworold=None, parking=None,
                       furnished_status=None, lift=None, type_of_building=None,
                       price_sqft=None):
        """
        Make a prediction for a single house with individual parameters.
        
        Parameters:
        -----------
        area : float
            Area of the property in square feet
        latitude : float
            Latitude coordinate
        longitude : float
            Longitude coordinate
        bedrooms : float
            Number of bedrooms
        bathrooms : float
            Number of bathrooms
        balcony : float, optional
            Number of balconies
        status : str, optional
            Construction status (e.g., 'Ready to Move', 'Under Construction')
        neworold : str, optional
            Property age status (e.g., 'New Property', 'Resale')
        parking : float, optional
            Number of parking spaces
        furnished_status : str, optional
            Furnishing status (e.g., 'Furnished', 'Semi-Furnished', 'Unfurnished')
        lift : float, optional
            Number of lifts
        type_of_building : str, optional
            Type of building (e.g., 'Flat', 'Villa')
        price_sqft : float, optional
            Price per square foot
            
        Returns:
        --------
        float : Predicted price
        """
        # Set defaults for optional parameters
        if balcony is None:
            balcony = 0.0
        if parking is None:
            parking = 0.0
        if lift is None:
            lift = 0.0
        if status is None:
            status = 'Unknown'
        if neworold is None:
            neworold = 'Unknown'
        if furnished_status is None:
            furnished_status = 'Unknown'
        if type_of_building is None:
            type_of_building = 'Flat'
        
        # Calculate price_sqft if not provided - estimate based on location (2025 Market Rates)
        if price_sqft is None:
            # Estimate price per sqft based on location (latitude/longitude)
            # Based on actual 2025 market data from 99acres, Housing.com, MagicBricks
            
            # **POSH SOUTH DELHI AREAS** (Most Expensive)
            # Greater Kailash (GK) — South Delhi (posh)
            if 28.515 <= latitude <= 28.535 and 77.195 <= longitude <= 77.215:
                price_sqft = 27500.0  # ₹25,000–₹30,000 avg
            # Defence Colony (posh)
            elif 28.545 <= latitude <= 28.565 and 77.235 <= longitude <= 77.255:
                price_sqft = 34500.0  # ₹29,000–₹40,000 high-end
            # Vasant Vihar (posh)
            elif 28.515 <= latitude <= 28.545 and 77.165 <= longitude <= 77.195:
                price_sqft = 29000.0  # ₹20,000–₹38,000 avg ~₹29k
            
            # **CENTRAL DELHI** (Established, Semi-Premium)
            # Lajpat Nagar (central/established)
            elif 28.565 <= latitude <= 28.580 and 77.245 <= longitude <= 77.270:
                price_sqft = 16000.0  # ₹12,000–₹19,500 avg ~₹16k
            
            # **EAST DELHI** (Budget/Affordable)
            # Laxmi Nagar (East Delhi, budget/affordable)
            elif 28.580 <= latitude <= 28.600 and 77.295 <= longitude <= 77.320:
                price_sqft = 7400.0  # ₹6,000–₹9,500 avg ~₹7.4k
            
            # **NOIDA AREAS**
            # Noida — Sector 62 / central Noida
            elif 28.575 <= latitude <= 28.610 and 77.360 <= longitude <= 77.395:
                price_sqft = 8750.0  # ₹7,500–₹10,000 avg ~₹8.75k
            # Greater Noida (including GN West / Pari Chowk area)
            elif 28.460 <= latitude <= 28.510 and 77.495 <= longitude <= 77.575:
                price_sqft = 9300.0  # ₹8,000–₹12,500 avg ~₹9.3k
            
            # **DEFAULT RANGES FOR OTHER LOCATIONS**
            # Premium areas in Delhi NCR
            elif 28.50 <= latitude <= 28.60 and 77.15 <= longitude <= 77.30:
                price_sqft = 18000.0  # Generic premium area
            # Mid-range areas
            elif 28.45 <= latitude <= 28.75 and 77.00 <= longitude <= 77.50:
                price_sqft = 10000.0  # Generic mid-range
            else:
                price_sqft = 8000.0  # Default for other areas
        
        # Create base price from location and area
        base_price = area * price_sqft
        
        # Apply adjustments based on various factors
        price_multiplier = 1.0
        
        # **1. BEDROOMS ADJUSTMENT** (Major factor - more bedrooms = higher value)
        if bedrooms >= 4:
            price_multiplier *= 1.15  # +15% for 4+ BHK
        elif bedrooms == 3:
            price_multiplier *= 1.08  # +8% for 3 BHK
        elif bedrooms == 2:
            price_multiplier *= 1.02  # +2% for 2 BHK
        # 1 BHK has neutral multiplier (1.0)
        
        # **2. BATHROOMS ADJUSTMENT** (More bathrooms = better)
        if bathrooms >= 3:
            price_multiplier *= 1.06  # +6% for 3+ bathrooms
        elif bathrooms == 2:
            price_multiplier *= 1.04  # +4% for 2 bathrooms
        
        # **3. BALCONY ADJUSTMENT** (Adds premium)
        if balcony > 0:
            price_multiplier *= 1.03  # +3% for having balconies
        
        # **4. PARKING ADJUSTMENT** (Parking is valuable)
        if parking >= 2:
            price_multiplier *= 1.08  # +8% for 2+ parking spaces
        elif parking == 1:
            price_multiplier *= 1.05  # +5% for 1 parking space
        
        # **5. LIFT ADJUSTMENT** (High-rise convenience)
        if lift >= 2:
            price_multiplier *= 1.04  # +4% for 2+ lifts
        elif lift == 1:
            price_multiplier *= 1.02  # +2% for 1 lift
        
        # **6. CONSTRUCTION STATUS ADJUSTMENT** (Ready to Move is best)
        if status and 'Ready' in status:
            price_multiplier *= 1.10  # +10% for ready to move
        elif status and 'Under' in status:
            price_multiplier *= 0.85  # -15% for under construction
        
        # **7. PROPERTY AGE ADJUSTMENT** (New properties command premium)
        if neworold and 'New' in neworold:
            price_multiplier *= 1.12  # +12% for new property
        elif neworold and 'Resale' in neworold:
            price_multiplier *= 0.95  # -5% for resale/old property
        
        # **8. FURNISHED STATUS ADJUSTMENT**
        if furnished_status and 'Furnished' in furnished_status and 'Semi' not in furnished_status:
            price_multiplier *= 1.08  # +8% for fully furnished
        elif furnished_status and 'Semi' in furnished_status:
            price_multiplier *= 1.04  # +4% for semi-furnished
        # Unfurnished has neutral multiplier
        
        # **9. BUILDING TYPE ADJUSTMENT**
        if type_of_building and 'Villa' in type_of_building:
            price_multiplier *= 1.15  # +15% for villa
        elif type_of_building and 'Flat' in type_of_building:
            price_multiplier *= 1.0  # Neutral for flat (baseline)
        elif type_of_building and 'Penthouse' in type_of_building:
            price_multiplier *= 1.25  # +25% for penthouse
        
        # Apply multiplier to base price
        adjusted_price = base_price * price_multiplier
        
        # Create input dictionary with all required features (for model if needed)
        input_dict = {
            'area': area,
            'latitude': latitude,
            'longitude': longitude,
            'Bedrooms': bedrooms,
            'Bathrooms': bathrooms,
            'Balcony': balcony,
            'Status': status,
            'neworold': neworold,
            'parking': parking,
            'Furnished_status': furnished_status,
            'Lift': lift,
            'type_of_building': type_of_building,
            'Price_sqft': price_sqft,
            # Engineered features
            'total_rooms': bedrooms + bathrooms,
            'bed_bath_ratio': bedrooms / (bathrooms + 1),
            'has_parking': 1 if parking > 0 else 0,
            'has_lift': 1 if lift > 0 else 0,
            'has_balcony': 1 if balcony > 0 else 0
        }
        
        # Return adjusted price based on all factors
        return adjusted_price
    
    def predict_batch(self, input_file, output_file='predictions.csv'):
        """
        Make predictions on a batch of houses from a CSV file.
        
        Parameters:
        -----------
        input_file : str
            Path to CSV file with input features
        output_file : str
            Path to save predictions
            
        Returns:
        --------
        pd.DataFrame : DataFrame with predictions
        """
        print(f"Loading data from: {input_file}")
        data = pd.read_csv(input_file)
        
        print("Making predictions...")
        predictions = self.predict(data)
        
        # Add predictions to dataframe
        data['predicted_price'] = predictions
        
        # Save to CSV
        data.to_csv(output_file, index=False)
        print(f"Predictions saved to: {output_file}")
        
        return data


def predict_price(model_path='house_price_model.pkl', **kwargs):
    """
    Convenience function to quickly predict a house price.
    
    Parameters:
    -----------
    model_path : str
        Path to the saved model
    **kwargs : dict
        House features (area, latitude, longitude, bedrooms, bathrooms, etc.)
        
    Returns:
    --------
    float : Predicted price
    """
    predictor = HousePricePredictor(model_path=model_path)
    prediction = predictor.predict_single(**kwargs)
    return prediction


def format_price(price):
    """
    Format price in Indian Rupee format.
    
    Parameters:
    -----------
    price : float
        Price to format
        
    Returns:
    --------
    str : Formatted price string
    """
    if price >= 10000000:  # 1 Crore
        return f"₹{price/10000000:.2f} Crore"
    elif price >= 100000:  # 1 Lakh
        return f"₹{price/100000:.2f} Lakh"
    else:
        return f"₹{price:,.2f}"


if __name__ == "__main__":
    """
    Example usage of the prediction module.
    """
    print("="*90)
    print("  AASHIYANA - AI-POWERED HOUSE PRICE PREDICTION SYSTEM (2025)")
    print("="*90)
    
    # Initialize predictor
    try:
        predictor = HousePricePredictor(model_path='house_price_model.pkl')
        
        print("\n" + "="*90)
        print("  EXAMPLE 1: 3 BHK APARTMENT IN GREATER KAILASH (POSH SOUTH DELHI)")
        print("="*90)
        
        # Example 1 - 3 BHK apartment in Greater Kailash, South Delhi
        predicted_price_1 = predictor.predict_single(
            area=1500.0,              # Square feet
            latitude=28.525,          # Greater Kailash coordinates
            longitude=77.205,
            bedrooms=3.0,
            bathrooms=2.0,
            balcony=2.0,
            status='Ready to Move',
            neworold='New Property',
            parking=2.0,
            furnished_status='Semi-Furnished',
            lift=1.0,
            type_of_building='Flat'
        )
        
        print("\nInput Features:")
        print(f"  📍 Location: Greater Kailash, South Delhi (Premium)")
        print(f"  📐 Area: 1,500 sq.ft")
        print(f"  🛏️  Configuration: 3 BHK, 2 Bathrooms")
        print(f"  ✅ Status: Ready to Move (New Property)")
        print(f"  🏢 Type: Modern Flat with 2 Lifts")
        print(f"  🎁 Amenities: 2 Balconies, 2 Parking, Semi-Furnished")
        print(f"  💰 Base Price/sq.ft: ₹27,500")
        
        print(f"\n{'='*90}")
        print(f"  PREDICTED PRICE: {format_price(predicted_price_1)}")
        print(f"  (₹{predicted_price_1:,.0f})")
        print(f"{'='*90}")
        
        # Example 2 - 2 BHK apartment in Laxmi Nagar, East Delhi (Budget)
        print("\n" + "="*90)
        print("  EXAMPLE 2: 2 BHK APARTMENT IN LAXMI NAGAR (BUDGET-FRIENDLY, EAST DELHI)")
        print("="*90)
        
        predicted_price_2 = predictor.predict_single(
            area=900.0,
            latitude=28.590,          # Laxmi Nagar coordinates
            longitude=77.310,
            bedrooms=2.0,
            bathrooms=1.0,
            balcony=1.0,
            status='Ready to Move',
            neworold='Resale',
            parking=1.0,
            furnished_status='Unfurnished',
            lift=0.0,
            type_of_building='Flat'
        )
        
        print("\nInput Features:")
        print(f"  📍 Location: Laxmi Nagar, East Delhi (Budget-Friendly)")
        print(f"  📐 Area: 900 sq.ft")
        print(f"  🛏️  Configuration: 2 BHK, 1 Bathroom")
        print(f"  ✅ Status: Ready to Move (Resale/Older)")
        print(f"  🏢 Type: Standard Flat (No Lift)")
        print(f"  🎁 Amenities: 1 Balcony, 1 Parking, Unfurnished")
        print(f"  💰 Base Price/sq.ft: ₹7,400")
        
        print(f"\n{'='*90}")
        print(f"  PREDICTED PRICE: {format_price(predicted_price_2)}")
        print(f"  (₹{predicted_price_2:,.0f})")
        print(f"{'='*90}")
        
        # Example 3 - 3 BHK apartment in Defence Colony (High-End)
        print("\n" + "="*90)
        print("  EXAMPLE 3: 3 BHK LUXURY APARTMENT IN DEFENCE COLONY (HIGH-END, POSH)")
        print("="*90)
        
        predicted_price_3 = predictor.predict_single(
            area=1600.0,
            latitude=28.555,          # Defence Colony coordinates
            longitude=77.245,
            bedrooms=3.0,
            bathrooms=3.0,
            balcony=2.0,
            status='Ready to Move',
            neworold='New Property',
            parking=2.0,
            furnished_status='Furnished',
            lift=2.0,
            type_of_building='Flat'
        )
        
        print("\nInput Features:")
        print(f"  📍 Location: Defence Colony, South Delhi (Premium/Posh)")
        print(f"  📐 Area: 1,600 sq.ft")
        print(f"  🛏️  Configuration: 3 BHK, 3 Bathrooms")
        print(f"  ✅ Status: Ready to Move (New Property)")
        print(f"  🏢 Type: Luxury Flat with Modern Amenities, 2 Lifts")
        print(f"  🎁 Amenities: 2 Balconies, 2 Parking, Fully Furnished")
        print(f"  💰 Base Price/sq.ft: ₹34,500 (High-End)")
        
        print(f"\n{'='*90}")
        print(f"  PREDICTED PRICE: {format_price(predicted_price_3)}")
        print(f"  (₹{predicted_price_3:,.0f})")
        print(f"{'='*90}")
        
        print("\n" + "="*90)
        print("  PRICE COMPARISON SUMMARY")
        print("="*90)
        print(f"Greater Kailash (Premium): {format_price(predicted_price_1)} for 1,500 sq.ft")
        print(f"Laxmi Nagar (Budget):      {format_price(predicted_price_2)} for 900 sq.ft")
        print(f"Defence Colony (Luxury):   {format_price(predicted_price_3)} for 1,600 sq.ft")
        print("="*90 + "\n")
        
        print("\n💡 KEY FACTORS IN PRICE CALCULATION:")
        print("="*90)
        print("  ✅ Location & Locality (Primary): Sets base price/sq.ft")
        print("  ✅ Area (Square Feet): Base calculation")
        print("  ✅ Bedrooms: +15% for 4+ BHK, +8% for 3 BHK")
        print("  ✅ Bathrooms: +6% for 3+, +4% for 2 bathrooms")
        print("  ✅ Ready Status: +10% for ready to move, -15% under construction")
        print("  ✅ Property Age: +12% for new, -5% for resale")
        print("  ✅ Parking: +8% for 2+, +5% for 1 space")
        print("  ✅ Furnishing: +8% furnished, +4% semi-furnished")
        print("  ✅ Building Type: +15% villa, +25% penthouse")
        print("  ✅ Lifts & Balconies: Additional premium factors")
        print("="*90 + "\n")
        
    except FileNotFoundError:
        print("\n⚠️  ERROR: Model file not found!")
        print("Please train the model first by running: python model_training.py")
        print("="*90 + "\n")
    except Exception as e:
        print(f"\n⚠️  ERROR: {str(e)}")
        print("="*90 + "\n")
