#!/bin/bash

# Read .env.example and generate .env.production with dummy values
while IFS= read -r line || [ -n "$line" ]; do
    # Skip empty lines and comments
    if [[ -z "$line" ]] || [[ "$line" =~ ^# ]]; then
        echo "$line" >> .env.production
    else
        # Get the variable name (everything before =)
        var_name=$(echo "$line" | cut -d= -f1)
        
        # Skip variables that start with SENTRY_ variables as they mess up the build if defined with dummy data... Learned this the hard way:
        # node_modules/@sentry/nextjs/build/types/config/types.d.ts
        if [[ "$var_name" =~ ^SENTRY_ ]]; then
            continue
        fi
        
        # Get existing environment variable value if it exists
        existing_value="${!var_name}"
        
        if [ -n "$existing_value" ]; then
            # Use existing environment variable value
            echo "${var_name}=${existing_value}" >> .env.production
        else
            # No existing value, use dummy values based on variable name
            if [[ "$var_name" =~ _URL$ ]] || [[ "$var_name" =~ _DSN$ ]]; then
                echo "${var_name}=https://dummy-url.com/" >> .env.production
            elif [[ "$var_name" == "NEXT_PUBLIC_ENVIRONMENT" ]]; then
                echo "${var_name}=ci" >> .env.production
            else
                echo "${var_name}=DUMMY_DO_NOT_REPLACE" >> .env.production
            fi
        fi
    fi
done < .env.example
