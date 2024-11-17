import React, { useEffect, useState } from 'react'
import { Select } from "@radix-ui/components/ui/select"
import { Button } from "@radix-ui/components/ui/button"

const FilterComponent = ({ onFilterChange, cinemas, genres, cities }) => {
    return (
      <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <Select onValueChange={(value) => onFilterChange('cinema', value)}>
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="Select Cinema" />
          </Select.Trigger>
          <Select.Content>
            {cinemas.map((cinema) => (
              <Select.Item key={cinema} value={cinema}>
                {cinema}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
  
        <Select onValueChange={(value) => onFilterChange('genre', value)}>
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="Select Genre" />
          </Select.Trigger>
          <Select.Content>
            {genres.map((genre) => (
              <Select.Item key={genre} value={genre}>
                {genre}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
  
        <Select onValueChange={(value) => onFilterChange('city', value)}>
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="Select City" />
          </Select.Trigger>
          <Select.Content>
            {cities.map((city) => (
              <Select.Item key={city} value={city}>
                {city}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
  
        <Button onClick={() => onFilterChange('reset')}>Reset Filters</Button>
      </div>
    )
  }